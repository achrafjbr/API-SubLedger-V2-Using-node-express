const { Subscription } = require("../models/Subscriptions");
const { getUsers, findUserById } = require("../dao/user");
const { getSubscriptionsByUser } = require("../dao/subscription");
const { getTransactionById } = require("../dao/transaction");

const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();

        res.json({
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getUserInfo = async (req, res) => {
    const { id } = req.params;

    try {
        const userInfo = await findUserById(id);
        const subs = await getSubscriptionsByUser(id);
        const trans = await getTransactionById(id);

        const [{ totalSpent }] = await Subscription.aggregate([
            {
                $group: {
                    _id: null,
                    totalSpent: { $sum: "$price" },
                },
            },
        ]);

        const totalSpentPerSubscription = await Subscription.find({}).select(
            "name price -_id"
        );

        res.json({
            userInfo,
            subscriptions: subs || [],
            transactions: trans || [],
            totalSpent,
            totalSpentPerSubscription,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = { getAllUsers, getUserInfo };
