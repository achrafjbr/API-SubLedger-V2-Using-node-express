const { getUsers, findUserById } = require("../dao/user");
const { getSubscriptionByUser } = require("../dao/subscription");
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
        const user = await findUserById(id);
        const subs = await getSubscriptionByUser(req.user.id);
        const trans = await getTransactionById(id);

        res.json({
            user,
            subscriptions: subs || [],
            transactions: trans || [],
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = { getAllUsers, getUserInfo };
