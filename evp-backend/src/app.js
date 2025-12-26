const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");

/* ===== ROUTES ===== */
const adminRoutes = require("./routes/admin.routes");
const jobRoutes = require("./routes/job.routes");
const applicationRoutes = require("./routes/jobApplication.routes");
const userAuthRoutes = require("./routes/userAuth.routes");

const app = express();

/* ================= CONNECT DB ================= */
connectDB();

/* ================= CORS (CRITICAL) ================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://evp-4cgo.vercel.app", // ✅ FRONTEND
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ================= STATIC ================= */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

/* ================= ROUTES ================= */
app.use("/api/admin", adminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/user", userAuthRoutes);

/* ================= HEALTH ================= */
app.get("/", (req, res) => {
  res.send("EVP Backend Running 🚀");
});

/* ================= 404 ================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ================= ERROR ================= */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

module.exports = app;
