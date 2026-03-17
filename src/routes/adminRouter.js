const express = require("express");
const { getUsers } = require("../controllers/adminController");

const adminRouter = express.Router();

adminRouter.get("/", getUsers);

module.exports = { adminRouter };
