import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= HANDLE LOGIN ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ CORRECT USER LOGIN ROUTE
      const res = await api.post("/api/user/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (!res.data?.token || !res.data?.user) {
        throw new Error("Invalid login response");
      }

      // ✅ Save token (matches axios interceptor)
      localStorage.setItem("userToken", res.data.token);

      // ✅ Save user for refresh
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Update context
      setUser(res.data.user);

      // ✅ Redirect
      navigate("/user/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-6">
      <div className="w-full max-w-md bg-white/10 border border-white/10 rounded-xl p-8">

        {/* BACK */}
        <Link
          to="/login"
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-400 mb-6"
        >
          <ArrowLeft size={16} />
          Back to portal selection
        </Link>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-2">
          User Login
        </h1>
        <p className="text-sm text-gray-300 text-center mb-8">
          Login to access your EVP profile
        </p>

        {/* ERROR */}
        {error && (
          <p className="mb-4 text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1">Email</label>
            <div className="flex items-center bg-slate-800 rounded border border-slate-700 px-3">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full bg-transparent px-3 py-2 focus:outline-none text-white"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="flex items-center bg-slate-800 rounded border border-slate-700 px-3">
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full bg-transparent px-3 py-2 focus:outline-none text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-yellow-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* EXTRA */}
        <div className="mt-6 text-sm text-center text-gray-300">
          <p>
            Forgot password?{" "}
            <span className="text-yellow-400 underline cursor-not-allowed">
              Recover here
            </span>
          </p>
        </div>

        <p className="mt-6 text-xs text-gray-400 text-center">
          Your login is secured using encrypted authentication
        </p>

      </div>
    </div>
  );
};

export default UserLogin;
