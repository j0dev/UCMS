const router = require("express").Router();
const controller = require("./controller");
const authMiddleware = require("../../../middlewares/auth");

// router.use("/", authMiddleware);
router.get("/", controller.list);
// router.post("/assign-admin/:userid", controller.assignAdmin);

module.exports = router;
