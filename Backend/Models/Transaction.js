import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  emailId: { type: String, required: true },
  transactionHash: { type: String, required: true },
  blockHash: { type: String, required: true },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  blockNumber: { type: Number, required: true },
  gasUsed: { type: Number, required: true },
});

const Transaction = mongoose.model(
  "Transactions",
  transactionSchema,
  "Transactions"
);

export default Transaction;
