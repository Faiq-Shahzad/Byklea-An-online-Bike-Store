const mongoose = require("mongoose");
const createError = require("http-errors");

// Validates req.body against a Joi schema. Unknown fields are dropped so clients
// can't set server-owned fields such as likesCount, approved or role.
const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body ?? {}, { stripUnknown: true });
  if (error) {
    return next(createError(400, error.details[0].message));
  }
  req.body = value;
  next();
};

// For router.param("id", ...): rejects malformed ids before they reach a query.
const validateObjectId = (req, res, next, id) => {
  if (!mongoose.isObjectIdOrHexString(id)) {
    return next(createError(400, "Invalid id"));
  }
  next();
};

module.exports = { validateBody, validateObjectId };
