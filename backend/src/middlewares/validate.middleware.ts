import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../utils/api-response";

const validateMiddleware =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (error) {
      let err = error;

      if (err instanceof z.ZodError) {
        err = err.issues.map((e) => ({
          path: e.path[1] || e.path[0],
          message: e.message,
        }));
      }
      
      return sendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        {},
        "zod-validation-error",
        err
      );
    }
  };

export default validateMiddleware;
