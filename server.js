// External imports

import express from "express";

const app = express();
import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";

import morgan from "morgan";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import helmet from "helmet";
import xss from "xss-clean";
import cookieParser from "cookie-parser";

// Routes

import authRouter from "./routes/authRoutes.js";

// Middlewares

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());

app.get("/", (req, res) => {
  res.send("Welcome to Lumenave CyberArk Identity Application");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
