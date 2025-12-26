const express = require("express");
const router = express.Router();

const { getApplications } = require("../controllers/jobApplication.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// 🔐 ADMIN: View all job applications
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getApplications
);

module.exports = router;
