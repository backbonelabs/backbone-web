import axios, { post } from 'axios';

export default (req, res) => {
  // on Post, headers must be set before request
  axios.defaults.headers.common.Authorization = `Bearer ${req.user.accessToken}`;

  post(`${process.env.API_SERVER_URL}/users/${req.user._id}`, req.body.user)
    .then((response) => {
      res.status(200).json({ user: response.data });
    })
    .catch((err) => {
      res.status(err.response.status).json({ error: err.response.data.error });
    });
};
