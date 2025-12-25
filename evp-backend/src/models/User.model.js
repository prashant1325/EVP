const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // ✅ removes extra spaces
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // ✅ normalize email
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6, // ✅ extra safety
      select: false, // ✅ NEVER return password by default
    },

    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },

    isActive: {
      type: Boolean,
      default: true, // ✅ future account blocking
    },

    profileVerified: {
      type: Boolean,
      default: false, // ✅ EVP profile verification
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);
