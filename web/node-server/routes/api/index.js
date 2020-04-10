const router = require("express").Router();
const authMiddleware = require("../../middlewares/auth");
const auth = require("./auth");
const account = require("./account");
const building = require("./building");

router.use("/auth", auth);
// router.use("/user", authMiddleware);
router.use("/account", account);
router.use("/building", building);

module.exports = router;
