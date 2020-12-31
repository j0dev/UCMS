const router = require("express").Router();
const controller = require("./controller");
const authMiddleware = require("../../../middlewares/auth");

router.use("/", authMiddleware);
router.get("/", controller.list);
router.get("/list", controller.computer);
router.post("/", controller.create);
router.put("/", controller.update);
router.use("/:id", authMiddleware);
router.delete("/:id", controller.delete);

module.exports = router;
