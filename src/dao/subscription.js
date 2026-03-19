const { Subscription } = require("../models/Subscriptions");

const subscribe = async (subscription) =>
    await Subscription.create(subscription);

const getSubscription = async (subscriptionId) =>
    await Subscription.findOne({ _id: subscriptionId });

const getSubscriptionByUser = async (userId) =>
    await Subscription.findOne({ userId: userId });

module.exports = {
    subscribe,
    getSubscription,
    getSubscriptionByUser,
};
