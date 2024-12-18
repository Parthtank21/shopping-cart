import cors from "cors";
import morgan from "morgan";
import express, { Express } from "express";
import productRouter from "./features/products/product.router";
import notFoundMiddleware from "./middlewares/not-found.middleware";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware";

const app: Express = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/products", productRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
