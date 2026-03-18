const { Subscription } = require("../models/Subscriptions");

const getStats = async (req, res) => {
    try {
        const data = await Subscription.aggregate([
            {
                $group: {
                    _id: null,

                    totalSubscriptions: { $sum: 1 },

                    activeSubscriptions: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "active"] }, 1, 0],
                        },
                    },

                    cancelledSubscriptions: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0],
                        },
                    },

                    totalRevenue: { $sum: "$price" },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalSubscriptions: 1,
                    activeSubscriptions: 1,
                    cancelledSubscriptions: 1,
                    totalRevenue: 1,
                },
            },
        ]);

        res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message,
        });
    }
};

module.exports = {
    getStats,
};
