const { getUsers } = require("../dao/user");

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

module.exports = { getAllUsers };
