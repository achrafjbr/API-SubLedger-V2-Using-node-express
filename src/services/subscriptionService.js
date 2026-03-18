const subscriptionDao = require("../dao/subscription");
const transactionDao = require("../dao/transaction");
const { findUserById,  } = require("../dao/user");
const { DIMessage, ErrorMessage, SuccessMessage } = require("../utils/error");

const subscribe = async (subscriptions) => {
  const subscriptionData = await subscriptionDao.subscribe(subscription);
  if (!subscriptionData)
    return new DIMessage().message(
      new ErrorMessage(500, "Something went wrong, try again"),
    );
   const {user, price}  = subscriptionData;
    // Create transaction for this user.
    const userTransaction = await transactionDao.getTransactionById(user);
    const transactionData = null;
    if(userTransaction){
       transactionData = transactionDao.createUserTransaction({amount:userTransaction.amount += price, id });
    }else {
     transactionData  = transactionDao.createUserTransaction({amount:price, id });
    }
  return new DIMessage().message(
    new SuccessMessage(201, "Success", {
      subscriptionData,
      transactionData
    }),
  );
};

const getUserSubscriptions = async (userId) => {
  const user = await findUserById(userId);
  if (!user)
    return new DIMessage().message(new ErrorMessage(404, "User not found"));
  const userSubscriptions = await Subscription.find({ user: userId }).populate(
    "user",
    "[name, email, password]",
  );
  if (!userSubscriptions)
    return new DIMessage().message(
      new ErrorMessage(404, "You have not no subscription"),
    );
  return new DIMessage().message(
    new SuccessMessage(200, "Success", userSubscriptions),
  );
};

const getSubscription = async (subscriptionId) => {
  const subscription = await subscriptionDao.getSubscription(subscriptionId);
  console.log("subscription", subscription);

  if (subscription == null) {
    return new DIMessage().message(
      new ErrorMessage(404, "Subscription not found"),
    );
  }
  return new DIMessage().message(
    new SuccessMessage(200, "Success", subscription),
  );
};

const updateSubscription = async (subscriptionId, body) => {
  console.log("body user", body);
  let subscription = await Subscription.findByIdAndUpdate(
    subscriptionId,
    body,

    { returnDocument: true },
  );
  if (!subscription)
    return new DIMessage().message(
      new ErrorMessage(404, "Subscription not found"),
    );
  return new DIMessage().message(
    new SuccessMessage(200, "Success", subscription),
  );
};

const deleteSubscription = async (subscriptionId) => {
  const subscription = await Subscription.delete({ _id: subscriptionId });
  if (!subscription)
    return new DIMessage().message(
      new ErrorMessage(404, "Subscription not found"),
    );
  return new DIMessage().message(
    new SuccessMessage(200, "Success", subscription),
  );
};

module.exports = {
  subscribe,
  getUserSubscriptions,
  getSubscription,
  updateSubscription,
  deleteSubscription,
};
