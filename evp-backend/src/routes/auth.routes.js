const express = require("express");
const { login, register } = require("../controllers/auth.controller");
const protect = require("../middleware/auth.middleware");
const User = require("../models/User.model");

const router = express.Router();

/* ================= LOGIN ================= */
router.post("/login", login);

/* ================= REGISTER ================= */
router.post("/register", register);

/* ================= GET LOGGED-IN USER ================= */
router.get("/me", protect, async (req, res) => {
  try {
    // Fetch full user details from DB
    const user = await User.findById(req.user.id).select(
      "name email role createdAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("ME API ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= LOGOUT ================= */
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ message: "Logged out" });
});

module.exports = router;
