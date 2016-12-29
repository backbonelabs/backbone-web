import { post } from 'axios';
import Debug from 'debug';
import createToken from './createToken';

const debug = Debug('routes:signup');

export default (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send({ error: 'All fields must be filled out' });
  }

  post(`${process.env.API_SERVER_URL}/users`, req.body)
    .then((response) => {
      // create jwt token and send with user data
      createToken(response.data.user, (error, token) => {
        if (error) {
          debug('Error signing JWT', req.body, error);
          return res.status(500);
        }
        const { accessToken, ...userData } = response.data.user; // eslint-disable-line
        return res.status(200).json({ user: userData, token });
      });
    })
    .catch((err) => {
      res.status(err.response.status).json({ error: err.response.data.error });
    });
};

