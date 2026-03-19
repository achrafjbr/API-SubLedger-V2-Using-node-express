const { Subscription } = require("../models/Subscriptions");

const subscribe = async (subscription) =>
    await Subscription.create(subscription);

const getSubscription = async (subscriptionId) =>
    await Subscription.findOne({ _id: subscriptionId });

const getSubscriptionsByUser = async (userId) =>
    await Subscription.find({ user: userId });

module.exports = {
    subscribe,
    getSubscription,
    getSubscriptionsByUser,
};
