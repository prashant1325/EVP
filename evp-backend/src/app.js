const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");

const app = express();

/* ================= CORS ================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // 🔑 allow cookies
  })
);

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(cookieParser());

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).send("EVP Backend Running Successfully 🚀");
});

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
