import "express-async-errors";
import dotenv from "dotenv";
import app from "./app";
import connectDb from "./db/db";

dotenv.config();

const DATABASE_URI = process.env.DATABASE_URI!;

app.listen(3001, async () => {
  try {
    await connectDb(DATABASE_URI);
    console.log("Server is listening on port 3001");
  } catch (error) {
    console.error(error);
  }
});
