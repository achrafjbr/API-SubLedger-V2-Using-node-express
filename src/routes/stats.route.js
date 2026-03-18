const { Router } = require("express");
const { getStats } = require("../controllers/stats.controller");
const { isAuthenticated, authRoles } = require("../middlewares/authentication");

const router = Router();

router.get("/", isAuthenticated, authRoles("ADMIN"), getStats);

module.exports = router;
