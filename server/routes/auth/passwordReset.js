import { post } from 'axios';

export default (req, res) => {
  const password = req.body.password;
  const verifyPassword = req.body.verifyPassword;

  if (!password || !verifyPassword) {
    return res.status(400).send({ error: 'All fields must be filled out' });
  }

  post(`${process.env.API_SERVER_URL}/auth/password-reset`, req.body)
    .then(() => res.status(200).json({ success: 'Password changed' }))
    .catch(err => res.status(err.response.status).json({ error: err.response.data.error }));
};
