import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowLeft } from "lucide-react";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 Backend integration will go here
    console.log("User Login Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-6">
      <div className="w-full max-w-md bg-white/10 border border-white/10 rounded-xl p-8">

        {/* ================= BACK ================= */}
        <Link
          to="/login"
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-400 mb-6"
        >
          <ArrowLeft size={16} />
          Back to portal selection
        </Link>

        {/* ================= TITLE ================= */}
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-2">
          User Login
        </h1>
        <p className="text-sm text-gray-300 text-center mb-8">
          Login to access your EVP profile
        </p>

        {/* ================= FORM ================= */}
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
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full bg-transparent px-3 py-2 focus:outline-none text-white"
              />
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Login
          </button>
        </form>

        {/* ================= EXTRA LINKS ================= */}
        <div className="mt-6 text-sm text-center text-gray-300">
          <p>
            Forgot password?{" "}
            <Link to="/user/login" className="text-yellow-400 underline">
              Recover here
            </Link>
          </p>
        </div>

        {/* ================= SECURITY NOTE ================= */}
        <p className="mt-6 text-xs text-gray-400 text-center">
          Your login is secured using encrypted authentication
        </p>

      </div>
    </div>
  );
};

export default UserLogin;
