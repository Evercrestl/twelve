import mongoose from "mongoose";

// const BankSchema = new mongoose.Schema(
//   {
//     bank: String,
//     accountName: String,
//     accountNumber: String,
//   },
//   { timestamps: true }
// );
const BankSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bank: String,
  accountName: String,
  accountNumber: String,
}, { timestamps: true });

export default mongoose.models.Bank ||
  mongoose.model("Bank", BankSchema);


