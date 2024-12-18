import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  AddProductDto,
  DeleteProductDto,
  GetAllProductsDto,
} from "./product.schema";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getTotalProductsCount,
} from "./product.services";
import sendResponse from "../../utils/api-response";

export const getAllProductsHandler = async (
  req: Request<{}, {}, {}, GetAllProductsDto["query"], {}>,
  res: Response
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  const products = await getAllProducts(limit, skip);
  const totalProducts = await getTotalProductsCount();

  sendResponse(
    res,
    StatusCodes.OK,
    products,
    "All products fetched successfully",
    "",
    {
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
      limit,
    }
  );
};

export const addProductHandler = async (
  req: Request<{}, {}, AddProductDto["body"]>,
  res: Response
) => {
  const product = await addProduct(req.body);

  sendResponse(
    res,
    StatusCodes.CREATED,
    product,
    "Products added successfully"
  );
};

export const deleteProductHandler = async (
  req: Request<DeleteProductDto["params"]>,
  res: Response
) => {
  const productId = req.params.id;
  await deleteProduct(productId);

  sendResponse(res, StatusCodes.OK, {}, "Products deleted successfully");
};
