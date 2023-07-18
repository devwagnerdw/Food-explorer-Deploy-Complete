const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const AdminPermission = require("../middlewares/AdminPermission");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/", AdminPermission, upload.single("image"), dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", AdminPermission, dishesController.delete);
dishesRoutes.patch("/:id", AdminPermission, upload.single("image"), dishesController.update);

module.exports = dishesRoutes;