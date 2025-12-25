import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, Mail, ArrowLeft } from "lucide-react";

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6">
      <div className="w-full max-w-md bg-white/10 border border-white/10 rounded-xl p-8 text-white">

        {/* ===== BACK LINK ===== */}
        <Link
          to="/login"
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-400 mb-6"
        >
          <ArrowLeft size={16} />
          Back to portal selection
        </Link>

        {/* ===== HEADER ===== */}
        <div className="text-center mb-8">
          <Shield size={48} className="mx-auto text-blue-400 mb-4" />
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="text-sm text-gray-300 mt-2">
            Secure access for employers & organizations
          </p>
        </div>

        {/* ===== FORM ===== */}
        <form className="space-y-5">

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
                className="w-full bg-transparent py-3 outline-none text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Password
            </label>
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent py-3 outline-none text-sm"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold tracking-wide
                       bg-blue-500 hover:bg-blue-400 transition
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login as Admin
          </button>
        </form>

        {/* ===== FOOTER LINKS ===== */}
        <div className="mt-6 text-center text-sm text-gray-400 space-y-2">
          <p>
            Forgot password?{" "}
            <Link to="/admin/forgot-password" className="text-blue-400 underline">
              Recover here
            </Link>
          </p>

          <p>
            New organization?{" "}
            <Link to="/admin/register" className="text-blue-400 underline">
              Register Admin
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin; // ✅ REQUIRED
