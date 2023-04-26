import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import route from "./routes/index.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
route(app);

// create server and connect db
const server = http.createServer(app);
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connect to db");

    server.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
