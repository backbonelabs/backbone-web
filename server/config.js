export default {
  secretKey: process.env.JWT_SECRET_KEY || 'DevSecretKey',
  mailgunKey: process.env.MAILGUN_SECRET_KEY,
};
