const express = require("express");
const router = express.Router();

const {
  userLogin,
  getUserProfile,
} = require("../controllers/userAuth.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/login", userLogin);
router.get("/me", authMiddleware, getUserProfile);

module.exports = router;
