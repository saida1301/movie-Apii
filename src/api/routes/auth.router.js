const router = require("express").Router();
const { login, confirmEmail } = require("../controllers/auth.controller");

router.post("/confirmCode", confirmEmail);
router.post("/login", login);

module.exports = router;