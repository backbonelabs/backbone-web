import Debug from 'debug';
import config from '../../config';

const { mailgunDomain, mailgunKey } = config;

const debug = Debug('routes:businessEmail');

const mailgun = require('mailgun-js')({
  apiKey: mailgunKey,
  domain: mailgunDomain,
});

const fromAddress = `Backbone <hello@${mailgunDomain}>`;

export default (req, res) => {
  const { email, name, company, phoneNum, message } = req.body;
  if (!email || !name || !company || !message || !phoneNum) {
    return res.status(400).json({ error: 'Form not complete' });
  }

  const template = `
  Name: ${name}
  Company: ${company}
  Phone: ${phoneNum}

  ${message}
  `;

  const data = {
    from: fromAddress,
    to: 'kp@gobackbone.com',
    subject: `Website inquiry - ${name} <${email}>`,
    text: template,
  };

  return mailgun.messages().send(data, (error, body) => {
    if (error) {
      debug('Error sending email', body, error);
      res.status(400).json('error', { error });
    } else {
      res.status(200).json({ success: 'Email sent' });
    }
  });
};
