const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");

// Load env variables (LOCAL only)
dotenv.config();

/* ================= START SERVER (LOCAL DEV) ================= */
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
