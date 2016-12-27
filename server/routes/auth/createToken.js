import jwt from 'jsonwebtoken';
import serverConfig from '../../config';

// create jwt token
export default (user) => {
  const token = jwt.sign({
    _id: user._id,
    accessToken: user.accessToken,
  }, serverConfig.secretKey, {
    expiresIn: '1h',
  });

  return token;
};
