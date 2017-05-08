const jwt = require("jsonwebtoken");

// create jwt token
const createToken = (_id, accessToken, callback) => {
  jwt.sign(
    {
      _id,
      accessToken
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h"
    },
    callback
  );
};

module.exports = createToken;
