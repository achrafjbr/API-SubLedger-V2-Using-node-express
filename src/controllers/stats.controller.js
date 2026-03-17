/**
 * todo  nombre total d’abonnements
 * todo  abonnements actifs
 * todo  abonnements annulés
 * todo  total dépensé
 */

const { Subscription } = require("../models/Subscriptions");

const getStats = async (req, res) => {
    try {
        const CountAndTotal = await Subscription.ageggate([
            { $count: "total" },

            {
                $sum: "$price",
            },
        ]);

        res.status(200).json({ CountAndTotal });
    } catch (error) {
        return response.status(500).json({
            statusCode: 500,
            message: error.message,
        });
    }
};

module.exports = {
    getStats,
};
