const { post } = require("axios");
const Debug = require("debug");
const createToken = require("./createToken");

const debug = Debug("routes:login");

module.exports = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send({ error: "All fields must be filled out" });
  }

  post(`${process.env.API_SERVER_URL}/auth/login`, req.body)
    .then(response => {
      const { accessToken, _id } = response.data;
      // Copy response.data object and remove acessToken
      let user = Object.assign({}, response.data);
      delete user.accessToken;

      // create jwt token and send with user data
      createToken(_id, accessToken, (error, token) => {
        if (error) {
          debug("Error signing JWT", req.body, error);
          return res.sendStatus(500);
        }
        return res.status(200).json({ user, token });
      });
    })
    .catch(err => {
      res.status(err.response.status).json({ error: err.response.data.error });
    });
};
