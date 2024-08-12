import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import CookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods :["GET","POST","PUT","PATH","DELETE"],
    credentials: true,
  })
);

app.use(CookieParser());
app.use(express.json());

app.use("/api/auth",authRoutes)

const server = app.listen(port, () => {
  console.log(`Server is running in the port ${port}`);
});

mongoose
  .connect(databaseURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
