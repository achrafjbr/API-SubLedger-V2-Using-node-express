const express = require("express");
const { getAllUsers } = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.get("/", getAllUsers);

module.exports = { adminRouter };
