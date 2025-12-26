import { useState } from "react";
import api from "../api/axios";

const ApplyJobModal = ({ job, onClose }) => {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!cv) {
      setErrorMsg("Please upload your CV (PDF).");
      return;
    }

    if (!job?._id) {
      setErrorMsg("Invalid job. Please refresh the page.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("jobId", job._id);
      formData.append("name", name);
      formData.append("college", college);
      formData.append("cv", cv);

      const res = await api.post("/api/jobs/apply", formData);

      // ✅ Open WhatsApp ONLY if URL exists
      if (res.data?.whatsappUrl) {
        window.open(res.data.whatsappUrl, "_blank");
      }

      onClose();
    } catch (error) {
      console.error("Apply Job Error:", error.response?.data || error.message);
      setErrorMsg(
        error.response?.data?.message ||
        "Failed to apply for job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 text-white w-full max-w-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Apply for {job.title}</h2>

        <div className="text-sm text-slate-400 mb-6">
          <p><b>Company:</b> {job.company}</p>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Type:</b> {job.type}</p>
          <p><b>Salary:</b> ₹{job.salary || "Not disclosed"}</p>
        </div>

        {/* 🔴 ERROR MESSAGE */}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleApply} className="space-y-4">
          <input
            type="text"
            placeholder="Your Full Name"
            className="w-full p-3 rounded bg-slate-800"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="College / University"
            className="w-full p-3 rounded bg-slate-800"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />

          <input
            type="file"
            accept=".pdf"
            className="w-full p-3 rounded bg-slate-800"
            onChange={(e) => setCv(e.target.files[0])}
            required
          />

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded bg-slate-700"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded bg-yellow-400 text-black font-bold disabled:opacity-60"
            >
              {loading ? "Applying..." : "Apply Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobModal;
