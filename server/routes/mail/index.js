const { Router } = require("express");
const businessEmail = require("./businessEmail");
const mailingList = require("./mailingList");
const contactEmail = require("./contactEmail");

const router = Router();

router.post("/contact", contactEmail);
router.post("/business", businessEmail);
router.post("/mailing-list", mailingList);

module.exports = router;
