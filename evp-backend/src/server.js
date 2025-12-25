const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

/* ================= START SERVER ================= */
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
