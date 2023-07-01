import express from "express";
import Transaction from "../Models/Transaction.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      token,
      transactionHash,
      blockHash,
      sender,
      receiver,
      blockNumber,
      gasUsed,
    } = req.body;
    const emailId = jwt.verify(token, process.env.JWTPRIVATEKEY).email;
    const newTransaction = new Transaction({
      emailId,
      transactionHash,
      blockHash,
      sender,
      receiver,
      blockNumber,
      gasUsed,
    });

    await newTransaction.save();

    res.status(201).send({ message: "Transaction saved successfully" });
  } catch (error) {
    console.error("Error saving transaction:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;
