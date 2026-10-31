const router = require("express").Router();
const crypto = require("crypto");
const createError = require("http-errors");
const { OpenAI } = require("openai");
const config = require("../util/config");

// Dialogflow gives the webhook ~5s, so fail fast rather than retry.
const openai = config.openaiApiKey
  ? new OpenAI({ apiKey: config.openaiApiKey, timeout: 4000, maxRetries: 0 })
  : null;

const digest = (value) => crypto.createHash("sha256").update(value).digest();

// Dialogflow sends this header (Fulfillment > Webhook > Headers). Without it the
// endpoint would be an open, unauthenticated proxy to a paid OpenAI key.
const verifyWebhookSecret = (req, res, next) => {
  if (!config.dialogflowWebhookSecret) {
    return next(createError(503, "Dialogflow webhook is not configured", { expose: true }));
  }
  const provided = req.get("x-webhook-secret") || "";
  if (!crypto.timingSafeEqual(digest(provided), digest(config.dialogflowWebhookSecret))) {
    return next(createError(401, "Invalid webhook secret"));
  }
  next();
};

const textGeneration = async (prompt) => {
  if (!openai) {
    return { status: 0, response: "" };
  }
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 100,
      top_p: 0.9,
      frequency_penalty: 1,
      presence_penalty: 0.3,
    });

    return {
      status: 1,
      response: response.choices[0].message.content || "",
    };
  } catch (error) {
    console.error("OpenAI fallback failed:", error.message);
    return {
      status: 0,
      response: "",
    };
  }
};

router.post("/", verifyWebhookSecret, async (req, res) => {
  const action = req.body?.queryResult?.action;
  const queryText = req.body?.queryResult?.queryText;
  if (typeof action !== "string") {
    throw createError(400, "Invalid Dialogflow request");
  }

  if (action === "input.unknown" && typeof queryText === "string") {
    const result = await textGeneration(queryText.slice(0, 1000));
    if (result.status == 1) {
      res.send({ fulfillmentText: result.response });
    } else {
      res.send({ fulfillmentText: `Sorry, I'm not able to help with that.` });
    }
  } else {
    res.send({ fulfillmentText: `No handler for the action ${action}.` });
  }
});

module.exports = router;
