import { Router } from "express";
import { createProductController } from "../controllers/productController.js";

let productRouter = Router();

productRouter.route("/").post(createProductController);

export default productRouter;
