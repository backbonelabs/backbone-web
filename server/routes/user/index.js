const { Router } = require("express");
const fetchUser = require("./fetchUser");
const updateUser = require("./updateUser");

const router = Router();

router.get("/", fetchUser);
router.post("/", updateUser);

module.exports = router;
