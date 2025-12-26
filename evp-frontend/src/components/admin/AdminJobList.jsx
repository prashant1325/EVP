import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminNavbar from "./AdminNavbar";
import {
  Briefcase,
  MapPin,
  IndianRupee,
  Trash2,
  Edit,
  Plus,
  Search,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const AdminJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* ================= FETCH JOBS ================= */
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/api/jobs");
        setJobs(res.data);
      } catch {
        setError("Failed to synchronize with the job database.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  /* ================= UPDATE STATUS (Approve/Reject) ================= */
  const updateStatus = async (id, status) => {
    try {
      const res = await api.patch(`/api/jobs/${id}/status`, { status });
      
      // Update local state so UI reflects the change immediately
      setJobs((prev) =>
        prev.map((job) =>
          job._id === id ? { ...job, status: res.data.job.status } : job
        )
      );
    } catch {
      alert("Failed to update job status");
    }
  };

  /* ================= DELETE JOB ================= */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to remove this job listing?")) return;
    try {
      await api.delete(`/api/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch {
      alert("System error: Could not delete the record.");
    }
  };

  /* ================= EDIT JOB ================= */
  const handleEdit = (job) => {
    navigate(`/admin/jobs/edit/${job._id}`, { state: job });
  };

  return (
    <div className="min-h-screen bg-[#020c1b] text-white selection:bg-yellow-400 selection:text-black">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto pt-28 px-6 pb-20">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Job <span className="text-yellow-400">Moderation</span>
            </h1>
            <p className="text-slate-400 flex items-center gap-2">
              <Search size={16} className="text-yellow-400" />
              Managing {jobs.length} job postings
            </p>
          </div>

          <Link
            to="/admin/post-job"
            className="flex items-center gap-2 bg-yellow-400 text-[#020c1b] px-6 py-3 rounded-xl font-bold hover:bg-white transition-all"
          >
            <Plus size={20} /> Post New Job
          </Link>
        </div>

        {/* ================= LOADING & ERROR ================= */}
        {loading && (
          <div className="flex flex-col items-center py-20 opacity-50">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="uppercase text-xs">Loading jobs...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-xl flex items-center gap-4 text-red-400">
            <AlertCircle /> {error}
          </div>
        )}

        {/* ================= JOB GRID ================= */}
        {!loading && jobs.length === 0 ? (
          <div className="text-center py-24 bg-[#112240]/30 border border-dashed border-white/10 rounded-3xl">
            <Briefcase size={48} className="mx-auto text-slate-700 mb-4" />
            <h3 className="text-xl font-bold text-slate-400">No jobs listed</h3>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className={`relative bg-[#112240]/50 border border-white/5 rounded-2xl p-8 transition-all hover:border-yellow-400/30 ${
                  job.status === "rejected" ? "opacity-60 grayscale-[0.5]" : ""
                }`}
              >
                {/* ================= STATUS BADGE ================= */}
                <span
                  className={`inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4
                    ${
                      job.status === "approved"
                        ? "bg-green-500/10 text-green-400"
                        : job.status === "rejected"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-yellow-400/10 text-yellow-400"
                    }
                  `}
                >
                  {job.status || "pending"}
                </span>

                {/* ================= ACTION BUTTONS (The 4 Buttons) ================= */}
                <div className="absolute top-6 right-6 flex gap-2">
                  {/* 1. APPROVE */}
                  <button
                    onClick={() => updateStatus(job._id, "approved")}
                    disabled={job.status === "approved"}
                    title="Approve"
                    className={`p-3 rounded-xl transition ${
                      job.status === "approved" 
                      ? "bg-green-500 text-white opacity-50 cursor-not-allowed" 
                      : "bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white"
                    }`}
                  >
                    <CheckCircle size={18} />
                  </button>

                  {/* 2. REJECT */}
                  <button
                    onClick={() => updateStatus(job._id, "rejected")}
                    disabled={job.status === "rejected"}
                    title="Reject"
                    className={`p-3 rounded-xl transition ${
                      job.status === "rejected" 
                      ? "bg-red-500 text-white opacity-50 cursor-not-allowed" 
                      : "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <XCircle size={18} />
                  </button>

                  {/* 3. EDIT */}
                  <button
                    onClick={() => handleEdit(job)}
                    title="Edit"
                    className="p-3 bg-white/5 text-slate-300 hover:bg-yellow-400 hover:text-[#020c1b] rounded-xl transition"
                  >
                    <Edit size={18} />
                  </button>

                  {/* 4. DELETE */}
                  <button
                    onClick={() => handleDelete(job._id)}
                    title="Delete"
                    className="p-3 bg-white/5 text-slate-300 hover:bg-red-600 hover:text-white rounded-xl transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* ================= JOB INFO ================= */}
                <h2 className="text-2xl font-bold mt-6">{job.title}</h2>
                <p className="text-slate-400 mt-1">{job.company}</p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin size={16} className="text-yellow-400" />
                    {job.location}
                  </div>

                  {job.salary && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <IndianRupee size={16} className="text-green-400" />
                      {job.salary}
                    </div>
                  )}
                </div>

                <p className="text-slate-400 text-sm mt-4 line-clamp-2">
                  {job.description}
                </p>
                
                {job.status === "rejected" && (
                  <p className="text-red-400 text-[10px] mt-4 font-bold uppercase tracking-tighter italic">
                    * This job is hidden from users
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminJobList;