const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  getApprovedJobs,
  updateJob,
  deleteJob,
  updateJobStatus,
  applyJob, // ✅ ADD
} = require("../controllers/job.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const upload = require("../middleware/upload.middleware"); // ✅ ADD

/* ================= PUBLIC ROUTES ================= */

// 🔓 USER HOME PAGE – approved jobs
router.get("/approved", getApprovedJobs);

// 🔓 USER APPLY JOB (CV upload + WhatsApp)
router.post(
  "/apply",
  upload.single("cv"),
  applyJob
);

/* ================= ADMIN ROUTES ================= */

// 🔐 ADMIN: Get ALL jobs
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  getJobs
);

// 🔐 ADMIN: Create new job
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createJob
);

// ✏️ ADMIN: Update job details
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateJob
);

// 🚦 ADMIN: Approve / Reject job
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("admin"),
  updateJobStatus
);

// 🗑️ ADMIN: Delete job
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteJob
);

module.exports = router;
