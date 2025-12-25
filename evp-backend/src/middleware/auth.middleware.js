const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    // 1️⃣ Read token from HTTP-only cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Attach user info to request
    req.user = decoded; // { id, role }

    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = protect;
