import { post } from 'axios';
import Debug from 'debug';
import createToken from './createToken';

const debug = Debug('routes:login');

export default (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send({ error: 'All fields must be filled out' });
  }

  post(`${process.env.API_SERVER_URL}/auth/login`, req.body)
    .then((response) => {
      // create jwt token and send with user data
      const { accessToken, ...user } = response.data;
      createToken(user._id, accessToken, (error, token) => {
        if (error) {
          debug('Error signing JWT', req.body, error);
          return res.sendStatus(500);
        }
        return res.status(200).json({ user, token });
      });
    })
    .catch((err) => {
      res.status(err.response.status).json({ error: err.response.data.error });
    });
};

