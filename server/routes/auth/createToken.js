import jwt from 'jsonwebtoken';
import serverConfig from '../../config';

// create jwt token
export default (user, res) => {
  jwt.sign({
    _id: user._id,
    accessToken: user.accessToken,
  }, serverConfig.secretKey, {
    expiresIn: '1h',
  }, (error, jwtToken) => {
    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ user, token: jwtToken });
  });
};
