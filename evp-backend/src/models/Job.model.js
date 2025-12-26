const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Contract"],
      default: "Full Time",
    },

    salary: {
      type: Number,
      min: 0,
    },

    description: {
      type: String,
      required: true,
    },

    /* ================= JOB APPROVAL STATUS ================= */
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },

    /* ================= COMPANY WHATSAPP (ADMIN ONLY) ================= */
    companyWhatsapp: {
      type: String,
      required: true,
      select: false, // 🔒 hidden from user APIs
    },

    /* ================= CREATED BY ADMIN ================= */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
