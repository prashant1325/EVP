const Job = require("../models/Job.model");
const JobApplication = require("../models/JobApplication.model");

/* ================= CREATE JOB ================= */
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,               // includes companyWhatsapp
      status: "pending",
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully and sent for approval",
      job,
    });
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);
    res.status(500).json({ message: "Job creation failed" });
  }
};

/* ================= GET ALL JOBS (ADMIN) ================= */
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .select("-companyWhatsapp")
      .sort({ createdAt: -1 })
      .populate("createdBy", "name email");

    res.status(200).json(jobs);
  } catch (error) {
    console.error("GET JOBS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

/* ================= GET APPROVED JOBS (USER) ================= */
exports.getApprovedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "approved" })
      .select("-companyWhatsapp")
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("GET APPROVED JOBS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch approved jobs" });
  }
};

/* ================= UPDATE JOB DETAILS ================= */
exports.updateJob = async (req, res) => {
  try {
    const { status, createdBy, ...safeData } = req.body;

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      safeData,
      { new: true }
    ).select("-companyWhatsapp");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);
    res.status(500).json({ message: "Job update failed" });
  }
};

/* ================= UPDATE JOB STATUS ================= */
exports.updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select("-companyWhatsapp");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      success: true,
      message: `Job ${status} successfully`,
      job,
    });
  } catch (error) {
    console.error("UPDATE JOB STATUS ERROR:", error);
    res.status(500).json({ message: "Failed to update job status" });
  }
};

/* ================= DELETE JOB ================= */
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("DELETE JOB ERROR:", error);
    res.status(500).json({ message: "Job deletion failed" });
  }
};

/* ================= APPLY JOB (USER) ================= */
exports.applyJob = async (req, res) => {
  try {
    const { jobId, name, college } = req.body;

    /* 1️⃣ File check */
    if (!req.file) {
      return res.status(400).json({ message: "CV file is required" });
    }

    /* 2️⃣ Fetch job with hidden WhatsApp */
    const job = await Job.findById(jobId).select("+companyWhatsapp");

    if (!job || job.status !== "approved") {
      return res.status(404).json({ message: "Job not available" });
    }

    /* 3️⃣ WhatsApp safety check */
    if (!job.companyWhatsapp) {
      return res.status(400).json({
        message: "Company WhatsApp number not configured by admin",
      });
    }

    /* 4️⃣ Windows-safe file path */
    const cvPath = req.file.path.replace(/\\/g, "/");

    /* 5️⃣ Save application */
    await JobApplication.create({
      jobId,
      name,
      college,
      cvUrl: cvPath,
    });

    /* 6️⃣ WhatsApp message */
    const message = `
New Job Application 🚀

Name: ${name}
College: ${college}
Job: ${job.title}
Company: ${job.company}
Location: ${job.location}
Salary: ${job.salary || "Not specified"}

CV:
${process.env.BASE_URL || "http://localhost:5000"}/${cvPath}
    `;

    const whatsappUrl = `https://wa.me/91${job.companyWhatsapp}?text=${encodeURIComponent(
      message
    )}`;

    res.status(200).json({ whatsappUrl });

  } catch (error) {
    console.error("APPLY JOB ERROR:", error);
    res.status(500).json({ message: "Failed to apply for job" });
  }
};
