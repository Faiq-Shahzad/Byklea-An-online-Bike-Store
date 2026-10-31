require("dotenv").config({ quiet: true });

// Values copied unchanged from .env.example count as unset.
const PLACEHOLDER = /^(your_|change_me)/i;

const read = (name) => {
  const value = process.env[name];
  return value && !PLACEHOLDER.test(value) ? value : undefined;
};

const jwtSecret = read("JWT_SECRET");
if (!jwtSecret || jwtSecret.length < 32) {
  throw new Error(
    "JWT_SECRET must be a random value of at least 32 characters. Generate one with: " +
      "node -e \"console.log(require('crypto').randomBytes(48).toString('hex'))\""
  );
}

const trustProxy = process.env.TRUST_PROXY;
const smtpPort = Number(process.env.SMTP_PORT) || 465;

const config = {
  env: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/byklea",
  jwtSecret,
  appUrl: process.env.APP_URL || "http://localhost:3000",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3001",
  // Number of reverse proxies in front of the app, so rate limiting sees real client IPs.
  trustProxy: !trustProxy ? false : Number.isNaN(Number(trustProxy)) ? trustProxy : Number(trustProxy),
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: smtpPort,
    user: read("SMTP_USER"),
    pass: read("SMTP_PASS"),
    from: read("MAIL_FROM") || read("SMTP_USER"),
  },
  openaiApiKey: read("OPENAI_API_KEY"),
  dialogflowWebhookSecret: read("DIALOGFLOW_WEBHOOK_SECRET"),
};

if (!config.smtp.user || !config.smtp.pass) {
  console.warn("SMTP_USER/SMTP_PASS not set: signup and password reset emails will fail");
}
if (!config.dialogflowWebhookSecret) {
  console.warn("DIALOGFLOW_WEBHOOK_SECRET not set: /dialogflow will reject all requests");
}

module.exports = config;
