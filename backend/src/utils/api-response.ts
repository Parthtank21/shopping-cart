import { Response } from "express";

const sendResponse = (
  res: Response,
  statusCode: number,
  data: any,
  message: string = "Success",
  error: any = [],
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    limit: number;
  }
) => {
  res.status(statusCode).json({
    status: statusCode < 400 ? "success" : "failed",
    message,
    data,
    error,
    pagination,
  });
};

export default sendResponse;
