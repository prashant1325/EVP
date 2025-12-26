const JobApplication = require("../models/JobApplication.model");

/* ================= GET ALL APPLICATIONS (ADMIN) ================= */
exports.getApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find()
      .populate("jobId", "title company location")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error("GET APPLICATIONS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};
