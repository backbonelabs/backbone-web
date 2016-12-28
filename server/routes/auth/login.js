import { post } from 'axios';
import createToken from './createToken';

export default (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send({ error: 'All fields must be filled out' });
  }

  post(`${process.env.API_SERVER_URL}/auth/login`, req.body)
    .then((response) => {
      // create jwt token and send with user data
      const token = createToken({ _id: response.data._id, accessToken: response.data.accessToken });
      res.status(200).json({ user: response.data, token });
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

