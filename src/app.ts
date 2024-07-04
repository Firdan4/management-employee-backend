import compression from "compression";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connection from "../src/config/db";
import User from "./db/models/user";
import routes from "./routes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
  try {
    connection.authenticate();
    console.log("database connection successfully!");
    console.log("...");
  } catch (error) {
    console.log("database connection error!");
  }

  console.log(`Server running on http://localhost:${PORT}`);
  console.log("...");
});
