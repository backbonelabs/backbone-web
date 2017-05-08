const Debug = require("debug");
const debug = Debug("routes:mail:contactEmail");

const { BL_MAILGUN_API, BL_MAILGUN_DOMAIN } = process.env;

const mailgun = require("mailgun-js")({
  apiKey: BL_MAILGUN_API,
  domain: BL_MAILGUN_DOMAIN
});

module.exports = (req, res) => {
  const { email, name, sentBy, phoneNum, message } = req.body;
  if (!email || !name || !sentBy || !message) {
    return res.status(400).json({ error: "Form not complete" });
  }

  const template = `${message}\n\n${name}\n${sentBy}\n${phoneNum}`;

  const data = {
    from: `${name} <${email}>`,
    to: sentBy === "investor" ? "kp@gobackbone.com" : "support@gobackbone.com",
    subject: "Website inquiry",
    text: template
  };

  return mailgun.messages().send(data, (error, body) => {
    if (error) {
      debug("Error sending email", body, error);
      res.status(500).json({ error: "An unexpected error has occurred." });
    } else {
      res.status(200).json({ success: "Email sent" });
    }
  });
};
