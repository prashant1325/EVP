const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  getAdminDashboard,
} = require("../controllers/admin.controller");

const authMiddleware = require("../middleware/auth.middleware");

// ===== AUTH =====
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// ===== DASHBOARD =====
router.get("/dashboard", authMiddleware, getAdminDashboard);

module.exports = router;
