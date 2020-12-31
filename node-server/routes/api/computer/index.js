const router = require("express").Router();
const controller = require("./controller");
const authMiddleware = require("../../../middlewares/auth");

router.post("/enroll/", controller.enroll);
router.get("/install/", controller.install);
router.post("/install/", controller.installInsert);
router.post("/install/update", controller.installUpdate);
router.post("/install/delete", controller.installDelete);
router.get("/:id", controller.list);

// router.use("/", authMiddleware);

// router.post("/", controller.create);
// router.put("/", controller.update);
router.post("/delete/", controller.delete);
// router.post("/program", controller.program);

module.exports = router;
