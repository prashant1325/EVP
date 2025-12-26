const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

/* ===== ROUTES ===== */
const adminRoutes = require("./routes/admin.routes");
const jobRoutes = require("./routes/job.routes");
const applicationRoutes = require("./routes/jobApplication.routes"); // ✅ ADD

const app = express();

/* ================= CORS ================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ================= STATIC FILES (CV UPLOADS) ================= */
// ✅ REQUIRED FOR CV DOWNLOAD & WHATSAPP LINK
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* ================= ROUTES ================= */
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes); // ✅ ADD

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).send("EVP Backend Running Successfully 🚀");
});

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;
