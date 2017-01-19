export default {
  secretKey: process.env.JWT_SECRET_KEY || 'DevSecretKey',
  mailgunKey: process.env.MAILGUN_SECRET_KEY || 'key-e973def1ab5567369e8ab125c19facd1',
};
