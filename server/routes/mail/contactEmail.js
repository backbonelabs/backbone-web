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
  const { email, name, sentBy, phoneNum, message } = req.body;
  if (!email || !name || !sentBy || !message) {
    return res.status(400).json({ error: 'Form not complete' });
  }

  const template = `
  Name: ${name}
  Sent by: ${sentBy}
  Phone: ${phoneNum}

  ${message}
  `;

  const data = {
    from: fromAddress,
    to: sentBy === 'investor' ? 'kp@gobackbone.com' : 'support@gobackbone.com',
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
