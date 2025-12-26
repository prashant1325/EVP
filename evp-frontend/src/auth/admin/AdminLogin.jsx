import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield,
  Lock,
  Mail,
  ArrowLeft,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔔 Notification state
  const [notification, setNotification] = useState({
    message: "",
    type: "", // success | error
  });

  /* ================= NOTIFICATION HANDLER ================= */
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  /* ================= LOGIN HANDLER ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Store token
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminInfo", JSON.stringify(data.admin));

      showNotification("Login successful!", "success");

      setTimeout(() => navigate("/admin/dashboard"), 1200);
    } catch (err) {
      showNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= TOP NOTIFICATION ================= */}
      {notification.message && (
        <div
          className={`fixed top-5 left-1/2 z-50 -translate-x-1/2
            px-6 py-3 rounded-lg shadow-lg flex items-center gap-3
            text-sm font-medium
            ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
        >
          <span>{notification.message}</span>
          <button onClick={() => setNotification({ message: "", type: "" })}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* ================= LOGIN CARD ================= */}
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6">
        <div className="w-full max-w-md bg-white/10 border border-white/10 rounded-xl p-8 text-white">

          {/* BACK LINK */}
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-400 mb-6"
          >
            <ArrowLeft size={16} />
            Back to portal selection
          </Link>

          {/* HEADER */}
          <div className="text-center mb-8">
            <Shield size={48} className="mx-auto text-blue-400 mb-4" />
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-sm text-gray-300 mt-2">
              Secure access for employers & organizations
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Admin Email
              </label>
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent py-3 outline-none text-sm"
                />
              </div>
            </div>

            {/* Password with Eye */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                Password
              </label>
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3">
                <Lock size={18} className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent py-3 outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-blue-400 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold tracking-wide
                         bg-blue-500 hover:bg-blue-400 transition
                         focus:outline-none focus:ring-2 focus:ring-blue-400
                         disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login as Admin"}
            </button>
          </form>

          {/* FOOTER LINKS */}
          <div className="mt-6 text-center text-sm text-gray-400 space-y-2">
            <p>
              Forgot password?{" "}
              <Link
                to="/admin/forgot-password"
                className="text-blue-400 underline"
              >
                Recover here
              </Link>
            </p>

            <p>
              New organization?{" "}
              <Link
                to="/admin/register"
                className="text-blue-400 underline"
              >
                Register Admin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
