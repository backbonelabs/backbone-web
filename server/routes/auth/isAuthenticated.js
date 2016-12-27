import { get } from 'axios';

export default (req, res) => {
  get(`${process.env.API_SERVER_URL}/users/${req.user._id}`, {
    headers: {
      Authorization: `Bearer ${req.user.accessToken}`,
    },
  })
    .then((response) => {
      console.log('pass');
      res.status(200).json({ user: response.data });
    })
    .catch((err) => {
      console.log('error');
      res.status(401).json({ error: err.response.data.error });
    });
};
