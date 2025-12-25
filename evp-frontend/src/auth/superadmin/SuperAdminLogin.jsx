import React from "react";
import { Link } from "react-router-dom";
import { Crown, Lock, Mail, ArrowLeft, ShieldCheck } from "lucide-react";

const SuperAdminLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6">
      <div className="w-full max-w-md bg-white/10 border border-purple-400/30 rounded-xl p-8 text-white">

        {/* ===== BACK ===== */}
        <Link
          to="/login"
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-400 mb-6"
        >
          <ArrowLeft size={16} />
          Back to portal selection
        </Link>

        {/* ===== HEADER ===== */}
        <div className="text-center mb-8">
          <Crown size={50} className="mx-auto text-purple-400 mb-4" />
          <h1 className="text-3xl font-bold tracking-wide">
            Super Admin Login
          </h1>
          <p className="text-sm text-gray-300 mt-2 flex items-center justify-center gap-1">
            <ShieldCheck size={14} />
            Restricted system-level access
          </p>
        </div>

        {/* ===== FORM ===== */}
        <form className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Super Admin Email
            </label>
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                placeholder="superadmin@evp.com"
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
                       bg-purple-600 hover:bg-purple-500 transition
                       focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Login as Super Admin
          </button>
        </form>

        {/* ===== FOOTER ===== */}
        <div className="mt-6 text-center text-xs text-gray-400">
          <p>
            Unauthorized access is monitored and logged.
          </p>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminLogin; // ✅ REQUIRED
