export default {
  secretKey: process.env.JWT_SECRET_KEY || 'DevSecretKey',
  mailgunKey: process.env.BL_MAILGUN_API,
  mailgunDomain: process.env.BL_MAILGUN_DOMAIN,
};
