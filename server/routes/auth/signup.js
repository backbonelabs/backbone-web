import { post } from 'axios';
import createToken from './createToken';

export default (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send({ error: 'All fields must be filled out' });
  }

  post(`${process.env.API_SERVER_URL}/users`, req.body)
    .then((response) => {
      // create jwt token and send with user data
      createToken(response.data.user, res);
    })
    .catch((err) => {
      // Bad Request: Password must be 8+ characters
      if (err.response.status === 400) {
        return res.status(400).json({ error: err.response.data.error });
      }
      // Unauthorized: invalid login credentials
      res.status(401).json({ error: err.response.data.error });
    });
};

