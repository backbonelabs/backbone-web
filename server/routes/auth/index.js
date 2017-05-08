const { Router } = require("express");
const login = require("./login");
const signup = require("./signup");
const requestReset = require("./requestReset");
const passwordReset = require("./passwordReset");

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/request-reset", requestReset);
router.post("/password-reset", passwordReset);

module.exports = router;
