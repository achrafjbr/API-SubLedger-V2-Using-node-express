
const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({
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

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = {
  Subscription
}
