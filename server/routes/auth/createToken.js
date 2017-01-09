import jwt from 'jsonwebtoken';
import serverConfig from '../../config';

// create jwt token
export default (_id, accessToken, callback) => {
  jwt.sign({
    _id,
    accessToken,
  }, serverConfig.secretKey, {
    expiresIn: '1h',
  }, callback);
};

