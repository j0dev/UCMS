const router = require("express").Router();
const controller = require("./controller");
const authMiddleware = require("../../../middlewares/auth");

router.get("/", controller.list);

// router.post("/assign-admin/:userid", controller.assignAdmin);
router.use("/", authMiddleware);
router.post("/", controller.create);
router.put("/", controller.update);
router.use("/:id", authMiddleware);
router.delete("/:id", controller.delete);

module.exports = router;
