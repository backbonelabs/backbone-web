import { get } from 'axios';
import jwt from 'jsonwebtoken';
import serverConfig from '../../config';

export default (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(401);
  }

  const decoded = jwt.verify(token.replace('Bearer ', ''), serverConfig.secretKey);

  get(`${process.env.API_SERVER_URL}/users/${decoded._id}`, {
    headers: {
      Authorization: `Bearer ${decoded.accessToken}`,
    },
  })
  .then((response) => {
    res.status(200).json({ user: response.data });
  })
  .catch((err) => {
    res.status(401).json({ error: err.response.data.error });
  });
};
