import Debug from 'debug';
import config from '../../config';

const { mailgunDomain, mailgunKey } = config;

const debug = Debug('routes:mailing-list');

const mailListDomain = `postkickstarterinterest@${mailgunDomain}`;
const mailgun = require('mailgun-js')({
  apiKey: mailgunKey,
  domain: mailgunDomain,
});

export default (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({ error: 'Email must be filled out.' });
  }

  mailgun
    .lists(mailListDomain)
    .members()
    .create({ upsert: 'yes', address: email }, (err) => {
      if (err) {
        debug('Error adding email to list', req.body, err);
        return res
          .status(500)
          .json({ error: 'An error has occurred, please try again later.' });
      }
      return res.status(200).json({ success: 'Thanks for signing up.' });
    });
};
