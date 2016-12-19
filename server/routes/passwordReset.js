import Debug from 'debug';
import request from 'request';

const debug = Debug('routes:passwordReset');

export default (req, res) => {
  debug('Request body', req.body);
  request({
    url: `${process.env.API_SERVER_URL}/auth/password-reset`,
    method: 'POST',
    body: req.body,
    json: true,
  }, (err, response, body) => {
    if (err) {
      debug('ClientRequest error', err);
      res.status(400).send(err.message);
    } else if (body && body.error) {
      debug('Request error', body.error);
      const { error } = body;
      let errorMsg;
      const contactSupport = 'Please contact <a href="mailto:support@gobackbone.com">support@gobackbone.com</a> for assistance.'; // eslint-disable-line max-len
      if (error.includes('token')) {
        errorMsg = `Invalid reset token. ${contactSupport}`;
      } else if (error === 'Passwords must match') {
        errorMsg = error;
      } else if (error.includes('password') || error.includes('verifyPassword')) {
        errorMsg = 'Invalid password format';
      } else {
        errorMsg = `Unexpected error. ${contactSupport}`;
      }
      res.status(400).send(errorMsg);
    } else {
      res.send();
    }
  });
};
