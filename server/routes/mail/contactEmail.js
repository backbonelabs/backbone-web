import Debug from 'debug';
import config from '../../config';

const { mailgunDomain, mailgunKey } = config;

const debug = Debug('routes:mail:contactEmail');

const mailgun = require('mailgun-js')({
  apiKey: mailgunKey,
  domain: mailgunDomain,
});

export default (req, res) => {
  const { email, name, sentBy, phoneNum, message } = req.body;
  if (!email || !name || !sentBy || !message) {
    return res.status(400).json({ error: 'Form not complete' });
  }

  const template = `${message}\n\n${name}\n${sentBy}\n${phoneNum}`;

  const data = {
    from: `${name} <${email}>`,
    to: sentBy === 'investor' ? 'kp@gobackbone.com' : 'support@gobackbone.com',
    subject: 'Website inquiry',
    text: template,
  };

  return mailgun.messages().send(data, (error, body) => {
    if (error) {
      debug('Error sending email', body, error);
      res.status(500).json({ error: 'An unexpected error has occurred.' });
    } else {
      res.status(200).json({ success: 'Email sent' });
    }
  });
};
