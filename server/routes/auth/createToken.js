import jwt from 'jsonwebtoken';
import serverConfig from '../../config';

// create jwt token
export default (user, callback) => {
  jwt.sign({
    _id: user._id,
    accessToken: user.accessToken,
  }, serverConfig.secretKey, {
    expiresIn: '1h',
  }, callback.bind(this));
};
