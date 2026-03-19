const express = require("express");
const { getAllUsers, getUserInfo } = require("../controllers/adminController");
const { isAuthenticated, authRoles } = require("../middlewares/authentication");

const adminRouter = express.Router();

adminRouter.use(isAuthenticated);
adminRouter.use(authRoles("ADMIN"));

adminRouter.get("/users", getAllUsers);
adminRouter.get("/users/:id", getUserInfo);

module.exports = { adminRouter };
