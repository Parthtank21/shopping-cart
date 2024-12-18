import express, { IRouter } from "express";
import validate from "../../middlewares/validate.middleware";
import {
  addProductSchema,
  deleteProductSchema,
  getAllProductsSchema,
} from "./product.schema";
import {
  addProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
} from "./product.controllers";

const router: IRouter = express.Router();

router
  .route("/")
  .get(validate(getAllProductsSchema), getAllProductsHandler)
  .post(validate(addProductSchema), addProductHandler);

router
  .route("/:id")
  .delete(validate(deleteProductSchema), deleteProductHandler);

export default router;
