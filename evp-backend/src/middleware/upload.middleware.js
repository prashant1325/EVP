const multer = require("multer");
const path = require("path");

/*
  ✅ Vercel-safe upload middleware
  ❌ No fs / mkdir / disk writes in production
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (process.env.NODE_ENV === "production") {
      // 🚫 Vercel does not allow file system writes
      return cb(new Error("File uploads are disabled in production"), null);
    }

    // ✅ Local development only
    cb(null, "uploads/cv");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

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
