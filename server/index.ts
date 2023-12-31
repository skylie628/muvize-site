import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import urls from "./config/urls.js";
import user from "./routes/user.js";
import show from "./routes/show.js";
import cookieParser from "cookie-parser";
import deserializeUserFromJWT from "./middlewares/deserializeUser.js";
dotenv.config();
const app = express();
mongoose
  .connect(urls.mongo)
  .then(() => {
    try {
      app.listen(urls.port, () => {
        console.log(
          `[server]: Server is running at http://localhost:${urls.port}`
        );
      });
    } catch (e: any) {
      console.log("Can't connect to the server. " + e.message);
    }
  })
  .catch((e: any) => {
    console.log("err is ", e.message);
  });

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
const corsOptions = {
  origin: process.env.CLIENT,
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(deserializeUserFromJWT);
// ROUTES
app.use("/api/v1/user", user);
app.use("/api/v1/show", show);
