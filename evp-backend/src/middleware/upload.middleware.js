const multer = require("multer");
const path = require("path");
const fs = require("fs");

/* ================= ENSURE UPLOAD DIRECTORY EXISTS ================= */
const uploadDir = path.join(process.cwd(), "uploads", "cv");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ================= MULTER STORAGE ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // ✅ guaranteed to exist
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

/* ================= MULTER CONFIG ================= */
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files allowed"));
    }
  },
});

module.exports = upload;
