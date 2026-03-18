const { Transaction } = require('../models/Transaction')


const createUserTransaction = async (transaction) =>
  await Transaction.updateOne({user:userId}, {$setOrInsert:{
    amount:transaction.amount,
  }})

  const getTransactionById =async(userId)=>{
    await Transaction.findOne({user:userId})
  }

module.exports = {
      createUserTransaction,
      getTransactionById,
}