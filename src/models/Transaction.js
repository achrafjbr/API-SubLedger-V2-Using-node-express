
const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  paymentDate: {
    type: Date,
    default:Date.now
  },
  amount:{
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = {
  Transaction
}
