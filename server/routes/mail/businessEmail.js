const Debug = require("debug");
const debug = Debug("routes:mail:businessEmail");

const { BL_MAILGUN_API, BL_MAILGUN_DOMAIN } = process.env;

const mailgun = require("mailgun-js")({
  apiKey: BL_MAILGUN_API,
  domain: BL_MAILGUN_DOMAIN
});

module.exports = (req, res) => {
  const { email, name, company, phoneNum, message } = req.body;
  if (!email || !name || !company || !message || !phoneNum) {
    return res.status(400).json({ error: "Form not complete" });
  }

  const template = `${message}\n\n${name}\n${company}\n${phoneNum}`;

  const data = {
    from: `${name} <${email}>`,
    to: "kp@gobackbone.com",
    subject: "Business inquiry",
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
