import React from "react";
import { Link } from "react-router-dom";
import { User, Shield, Crown, HelpCircle, Lock } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-6">
      <div className="max-w-6xl w-full text-center">

        {/* ================= TITLE ================= */}
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          Access Employee Verification Portal
        </h1>
        <p className="text-gray-300 mb-4">
          Select your role to login or create an account
        </p>

        {/* ===== SECURITY NOTE ===== */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-12">
          <Lock size={16} />
          <span>Your access is protected with secure authentication</span>
        </div>

        {/* ================= PORTAL CARDS ================= */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* ================= USER ================= */}
          <div className="bg-white/10 border border-white/10 p-10 rounded-xl">
            <User size={48} className="mx-auto mb-6 text-yellow-400" />
            <h2 className="text-2xl font-semibold mb-2">User</h2>
            <p className="text-gray-300 text-sm mb-4">
              Employees, job seekers & professionals
            </p>
            <p className="text-gray-400 text-xs mb-6">
              View your EVP score, employment history, and apply for verified jobs.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                to="/user/login"
                className="bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
              >
                Login
              </Link>
              
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Forgot password?{" "}
              <Link to="/user/login" className="text-yellow-400 underline">
                Recover here
              </Link>
            </p>
          </div>

          {/* ================= ADMIN ================= */}
          <div className="bg-white/10 border border-white/10 p-10 rounded-xl">
            <Shield size={48} className="mx-auto mb-6 text-blue-400" />
            <h2 className="text-2xl font-semibold mb-2">Admin</h2>
            <p className="text-gray-300 text-sm mb-4">
              Employers, HR & organizations
            </p>
            <p className="text-gray-400 text-xs mb-6">
              Verify employees, manage records, assign EVP ratings.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                to="/admin/login"
                className="bg-blue-500 py-2 rounded font-semibold hover:bg-blue-400 transition"
              >
                Login
              </Link>
              <Link
                to="/admin/register"
                className="border border-blue-400 text-blue-400 py-2 rounded hover:bg-blue-400 hover:text-black transition"
              >
                Register
              </Link>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Organization not registered?{" "}
              <Link to="/admin/register" className="text-blue-400 underline">
                Create admin account
              </Link>
            </p>
          </div>

          {/* ================= SUPER ADMIN ================= */}
          <div className="bg-white/10 border border-white/10 p-10 rounded-xl">
            <Crown size={48} className="mx-auto mb-6 text-purple-400" />
            <h2 className="text-2xl font-semibold mb-2">Super Admin</h2>
            <p className="text-gray-300 text-sm mb-4">
              Platform & system controllers
            </p>
            <p className="text-gray-400 text-xs mb-6">
              Manage users, organizations, analytics & system settings.
            </p>

            <Link
  to="/superadmin/login"
  className="w-full block text-center
             bg-purple-600 text-white
             py-3 rounded-lg
             font-semibold tracking-wide
             hover:bg-purple-500 transition
             border border-purple-400"
>
  Login
</Link>


            <p className="mt-4 text-xs text-gray-400">
              Access restricted to authorized personnel only
            </p>
          </div>

        </div>

        {/* ================= HELP & LEGAL ================= */}
        <div className="mt-14 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <HelpCircle size={16} />
            <Link to="/contact" className="hover:text-yellow-400">
              Need help? Contact Support
            </Link>
          </div>

          <p>
            By continuing, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-yellow-400">
              Terms
            </Link>{" "}
            &{" "}
            <Link to="/privacy" className="underline hover:text-yellow-400">
              Privacy Policy
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
