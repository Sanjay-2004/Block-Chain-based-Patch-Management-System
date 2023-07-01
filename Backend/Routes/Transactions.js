import express from "express";
const router = express.Router();
import Transaction from "../Models/Transaction.js";

router.post("/", async (req, res) => {
  try {
    await new Transaction(req.body).save();
    res.status(201).send({ message: "Transaction saved successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
