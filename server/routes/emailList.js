import config from '../config';

const domain = 'mail.gobackbone.com';
const mailgun = require('mailgun-js')({ apiKey: config.mailgunKey, domain });

export default (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({ error: 'All fields must be filled out' });
  }

  mailgun.lists(domain).members().create(email, (err, body) => {
    if (err) {
      console.log(err);
      return res.render('emailList', { error: 'An error has occurred, Please try again later.' });
    }
    console.log(body);
    return res.render('emailList', { success: 'Thanks for signing up' });
  });
};

