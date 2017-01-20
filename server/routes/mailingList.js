import config from '../config';

const domain = 'postkickstarterinterest@mail.gobackbone.com';
const mailgun = require('mailgun-js')({ apiKey: config.mailgunKey, domain });

export default (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({ error: 'Email must be filled out.' });
  }

  mailgun.lists(domain).members().create({ address: email }, (err, body) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'An error has occurred, please try again later.' });
    }
    console.log(body);
    return res.status(200).json({ success: 'Thanks for signing up.' });
  });
};

