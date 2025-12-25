const express = require("express");
const protect = require("../middleware/auth.middleware");
const allowRoles = require("../middleware/role.middleware");

const router = express.Router();

router.get("/user", protect, allowRoles("user"), (req, res) => {
  res.json({ message: "User dashboard data" });
});

router.get("/admin", protect, allowRoles("admin"), (req, res) => {
  res.json({ message: "Admin dashboard data" });
});

router.get("/superadmin", protect, allowRoles("superadmin"), (req, res) => {
  res.json({ message: "Super Admin dashboard data" });
});

module.exports = router;
