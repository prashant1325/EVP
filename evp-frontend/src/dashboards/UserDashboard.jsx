import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {
  User,
  Mail,
  ShieldCheck,
  LogOut,
  IndianRupee,
  Building2,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= DUMMY DATA ================= */
  const jobStatus = {
    company: "Fixkart Pvt Ltd",
    role: "Frontend Developer",
    offerLetter: true,
    salarySlip: true,
    employmentStatus: "Verified",
    monthlySalary: 45000,
    annualCTC: 540000,
  };

  const bankOffers = [
    { bank: "HDFC Bank", amount: "6,00,000", interest: "10.5%" },
    { bank: "ICICI Bank", amount: "5,50,000", interest: "10.75%" },
    { bank: "Axis Bank", amount: "6,25,000", interest: "10.25%" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) { navigate("/user/login"); return; }

    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/user/me");
        setProfile(res.data);
      } catch (error) {
        localStorage.removeItem("userToken");
        navigate("/user/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("userToken");
    navigate("/user/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-yellow-400 font-medium">
        <div className="animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 px-6 py-10 selection:bg-yellow-400/30">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              User Dashboard
            </h1>
            <p className="text-slate-400 text-sm mt-1">Manage your employment and financial profile</p>
          </div>

          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-5 py-2.5 rounded-xl border border-red-500/20 transition-all active:scale-95"
          >
            <LogOut size={18} />
            <span className="font-semibold">Logout</span>
          </button>
        </div>

        {/* PROFILE + EVP */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Personal Info Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-yellow-400/30 transition-all duration-300">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
              <div className="p-2 bg-yellow-400/10 rounded-lg">
                <User className="text-yellow-400" size={20} />
              </div>
              Personal Information
            </h2>

            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase tracking-wider">Full Name</span>
                <span className="text-lg font-medium">{profile?.name || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 uppercase tracking-wider">Email Address</span>
                <div className="flex items-center gap-2 text-slate-300">
                   <Mail size={14} className="text-yellow-400/60" /> {profile?.email}
                </div>
              </div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/20">
                <ShieldCheck size={14} /> Account Verified
              </div>
            </div>
          </div>

          {/* EVP Score Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center flex flex-col justify-center items-center hover:border-yellow-400/30 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-yellow-400/10 transition-all"></div>
            <h2 className="text-xl font-bold mb-2 text-slate-400">EVP Score</h2>
            <p className="text-7xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
              {profile?.evpScore ?? 720}
            </p>
            <p className="text-slate-500 text-xs mt-4 font-medium uppercase tracking-[0.2em]">
              Employee Verification Score
            </p>
          </div>
        </div>

        {/* DETAILS GRID */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Employment */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-3">
              <Building2 className="text-yellow-400" size={18} /> Employment Status
            </h2>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <p className="text-slate-500 text-xs uppercase">Company</p>
                <p className="font-semibold">{jobStatus.company}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase">Role</p>
                <p className="font-semibold">{jobStatus.role}</p>
              </div>
              <div className="col-span-2 pt-2 flex gap-3">
                <span className="bg-slate-800 px-3 py-1 rounded-md text-[11px] font-bold border border-white/5 uppercase">
                  Offer Letter: {jobStatus.offerLetter ? "✅" : "❌"}
                </span>
                <span className="bg-slate-800 px-3 py-1 rounded-md text-[11px] font-bold border border-white/5 uppercase">
                  Salary Slip: {jobStatus.salarySlip ? "✅" : "⏳"}
                </span>
              </div>
            </div>
          </div>

          {/* Salary */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-5 flex items-center gap-3">
              <IndianRupee className="text-yellow-400" size={18} /> Salary Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                <p className="text-slate-500 text-xs uppercase">Monthly</p>
                <p className="text-2xl font-bold text-white">₹45,000</p>
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                <p className="text-slate-500 text-xs uppercase">Annual CTC</p>
                <p className="text-2xl font-bold text-white">₹5.4L</p>
              </div>
            </div>
          </div>
        </div>

        {/* BANK OFFERS */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-white">Bank Loan Offers</h2>
            <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded font-black uppercase">Instant Approval</span>
          </div>

          <div className="space-y-4">
            {bankOffers.map((offer, index) => (
              <div
                key={index}
                className="group flex items-center justify-between bg-black/20 hover:bg-white/5 p-5 rounded-xl border border-transparent hover:border-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center font-bold text-yellow-400 border border-white/10 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                    {offer.bank[0]}
                  </div>
                  <div>
                    <p className="font-bold text-lg group-hover:text-yellow-400 transition-colors">{offer.bank}</p>
                    <p className="text-sm text-slate-400">
                      Amount: <span className="text-white font-medium">₹{offer.amount}</span> • Interest: <span className="text-white font-medium">{offer.interest}</span>
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-400/10 p-2 rounded-lg text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all">
                  <Eye size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;