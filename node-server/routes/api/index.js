const router = require("express").Router();
const authMiddleware = require("../../middlewares/auth");
const auth = require("./auth");
const account = require("./account");
const building = require("./building");
const classroom = require("./classroom");
const classR = require("./class");
const computer = require("./computer");
const order = require("./order");

router.use("/auth", auth);
// router.use("/user", authMiddleware);
router.use("/account", account);
router.use("/building", building);
router.use("/classroom", classroom);
router.use("/class", classR);
router.use("/computer", computer);
router.use("/order", order);

module.exports = router;
