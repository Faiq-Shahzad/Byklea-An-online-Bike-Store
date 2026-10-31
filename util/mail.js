const nodemailer = require("nodemailer");
const config = require("./config");

let transporter;

// Throws on failure so callers can decide how to recover.
module.exports = async (email, subject, text) => {
  if (!config.smtp.user || !config.smtp.pass) {
    throw new Error("SMTP is not configured (set SMTP_USER and SMTP_PASS)");
  }

  transporter ??= nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    // Port 465 is implicit TLS; other ports (587) upgrade with STARTTLS.
    secure: config.smtp.port === 465,
    pool: true,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });

  await transporter.sendMail({
    from: config.smtp.from,
    to: email,
    subject: subject,
    text: text,
  });
};
