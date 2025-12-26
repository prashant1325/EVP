import React, { useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Building2,
  IndianRupee,
  AlignLeft,
  Sparkles,
  Phone,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import AdminNavbar from "./AdminNavbar";

const AdminPostJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full Time",
    salary: "",
    description: "",
    companyWhatsapp: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ WhatsApp validation (India – 10 digits, starts 6-9)
    if (!/^[6-9]\d{9}$/.test(formData.companyWhatsapp)) {
      setError("Please enter a valid 10-digit Indian WhatsApp number");
      setLoading(false);
      return;
    }

    try {
      await api.post("/api/jobs", formData);
      navigate("/admin/jobs");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020c1b] text-white">
      <AdminNavbar />

      <div className="max-w-4xl mx-auto px-6 py-12 pt-28">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-yellow-400 mb-8"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <div className="bg-[#112240]/50 border border-white/10 rounded-3xl p-10 shadow-2xl">
          <header className="mb-10">
            <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase mb-2">
              <Sparkles size={14} />
              Recruitment Management
            </div>
            <h1 className="text-4xl font-black">
              Create <span className="text-yellow-400">Job</span>
            </h1>
            <p className="text-slate-400 mt-2">
              Fill in details to publish a verified opportunity
            </p>
          </header>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* JOB TITLE */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm">Job Title</label>
              <div className="flex items-center gap-3 bg-[#0a192f] px-4 rounded-xl">
                <Briefcase size={18} />
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Frontend Developer"
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </div>

            {/* COMPANY */}
            <div>
              <label className="block mb-2 text-sm">Company</label>
              <div className="flex items-center gap-3 bg-[#0a192f] px-4 rounded-xl">
                <Building2 size={18} />
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="ABC Pvt Ltd"
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </div>

            {/* WHATSAPP */}
            <div>
              <label className="block mb-2 text-sm">
                Company WhatsApp Number
              </label>
              <div className="flex items-center gap-3 bg-[#0a192f] px-4 rounded-xl">
                <Phone size={18} />
                <input
                  type="tel"
                  name="companyWhatsapp"
                  required
                  maxLength={10}
                  value={formData.companyWhatsapp}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </div>

            {/* LOCATION */}
            <div>
              <label className="block mb-2 text-sm">Location</label>
              <div className="flex items-center gap-3 bg-[#0a192f] px-4 rounded-xl">
                <MapPin size={18} />
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Bangalore"
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </div>

            {/* TYPE */}
            <div>
              <label className="block mb-2 text-sm">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-[#0a192f] py-4 px-4 rounded-xl"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>

            {/* SALARY */}
            <div>
              <label className="block mb-2 text-sm">Monthly Salary</label>
              <div className="flex items-center gap-3 bg-[#0a192f] px-4 rounded-xl">
                <IndianRupee size={18} />
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="30000"
                  className="w-full bg-transparent py-4 outline-none"
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm">Description</label>
              <div className="flex gap-3 bg-[#0a192f] px-4 py-4 rounded-xl">
                <AlignLeft size={18} />
                <textarea
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Job responsibilities and requirements"
                  className="w-full bg-transparent outline-none resize-none"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 hover:bg-white text-black font-bold py-5 rounded-xl disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPostJob;
