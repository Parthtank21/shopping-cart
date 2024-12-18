import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../utils/api-response";

const notFoundMiddleware = (req: Request, res: Response) => {
  return sendResponse(res, StatusCodes.NOT_FOUND, [], "Route does not exist");
};

export default notFoundMiddleware;
