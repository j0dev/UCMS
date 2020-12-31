const router = require("express").Router();
const controller = require("./controller");
const authMiddleware = require("../../../middlewares/auth");

router.get("/classroom/:id", controller.list);
router.post("/computer/", controller.detail);
router.post("/create", controller.create);
router.post("/createall", controller.createall);

router.post("/check", controller.checkOrder);
router.post("/program", controller.programList);
router.post("/start", controller.startProgramList);
router.post("/power", controller.isPower);
router.post("/lock", controller.isLock);
// router.post("/isPower", controller.isPower);

// router.use("/", authMiddleware);

// router.post("/", controller.create);
// router.put("/", controller.update);
// router.delete("/:id", controller.delete);

module.exports = router;
