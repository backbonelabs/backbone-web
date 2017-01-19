import { post } from 'axios';

export default (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send({ error: 'Email must be filled out' });
  }

  post(`${process.env.API_SERVER_URL}/auth/password-reset-token`, req.body)
    .then(() => res.status(200).json({ success: 'Email sent' }))
    .catch(err => res.status(err.response.status).json({ error: err.response.data.error }));
};

