const router = require("express").Router();
const controller = require("./controller");
const authMiddleware = require("../../../middlewares/auth");
const { listenerCount } = require("../../../models/user");

// router.use("/list", authMiddleware);
router.get("/list", controller.list);
router.use("/iser", authMiddleware);
router.get("/user", controller.user);
router.get("/notuser", controller.userNotActive);
router.get("/anduser", controller.userActive);
router.post("/delete", controller.userDelete);
router.post("/active", controller.activeChange);
router.get("/student", controller.getStudents);
router.post("/insert", controller.insertClassUser);

// router.post("/assign-admin/:userid", controller.assignAdmin);

module.exports = router;
