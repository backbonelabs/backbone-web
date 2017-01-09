import { get } from 'axios';

export default (req, res) => {
  get(`${process.env.API_SERVER_URL}/users/${req.user._id}`, {
    headers: {
      Authorization: `Bearer ${req.user.accessToken}`,
    },
  })
  .then((response) => {
    res.status(200).json({ user: response.data });
  })
  .catch((err) => {
    res.status(err.response.status).json({ error: err.response.data.error });
  });
};
