const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

/* ===== ROUTES ===== */
const adminRoutes = require("./routes/admin.routes");
const jobRoutes = require("./routes/job.routes");
const applicationRoutes = require("./routes/jobApplication.routes");
const userAuthRoutes = require("./routes/userAuth.routes");

const app = express();

/* ================= CORS ================= */
/*
  ✔ Local development
  ✔ Netlify production
*/
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://YOUR-FRONTEND-NAME.netlify.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ================= STATIC FILES ================= */
/*
  ⚠️ NOTE FOR VERCEL:
  Local uploads work in dev.
  For production → use Cloudinary / S3.
*/
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

/* ================= ROUTES ================= */
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/user", userAuthRoutes);

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

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
