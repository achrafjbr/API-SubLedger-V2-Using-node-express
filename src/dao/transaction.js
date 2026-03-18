const { Transaction } = require('../models/Transaction')

const createUserTransaction = async (transaction) => {
  return await Transaction.updateOne(
    { user: transaction.user },
    { $inc: { amount: transaction.amount } },
    { upsert: true, new: true },
  );
};
  

  const getTransactionById =async(user)=>{
    return await Transaction.findOne({user:user})
  }

module.exports = {
      createUserTransaction,
      getTransactionById,
}