import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import CookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoutes.js";


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

app.use('/uploads/profiles',express.static('uploads/profiles'))

app.use(CookieParser());
app.use(express.json());


app.use("/api/auth",authRoutes)
app.use('/api/contacts',contactRoutes)
app.use("/api/messages",messagesRoutes)

const server = app.listen(port, () => {
  console.log(`Server is running in the port ${port}`);
});

setupSocket(server)

mongoose
  .connect(databaseURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
