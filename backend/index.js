import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use("/products", productRoute);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`app listening on port : ${process.env.PORT}`);
});
