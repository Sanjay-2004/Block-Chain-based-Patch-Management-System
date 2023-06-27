import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import bugsRouter from "./Routes/Bugs.js";
import userRouter from "./Routes/Users.js";
import authRouter from "./Routes/Auth.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/create-bug", bugsRouter);
app.use("/bug-reports", bugsRouter);
app.use("/signup", userRouter);
app.use("/login", authRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose
  .connect(
    "mongodb+srv://Sanjay:Sanjay.04@blcpmgmt.scewiep.mongodb.net/Project",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
