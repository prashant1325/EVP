import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../../api/axios";
import AdminNavbar from "./AdminNavbar";
import { Save, ArrowLeft } from "lucide-react";

const AdminEditJob = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    description: "",
  });

  /* ================= LOAD JOB ================= */
  useEffect(() => {
    if (location.state) {
      // Coming from Edit button
      setFormData(location.state);
      setLoading(false);
    } else {
      // Direct URL refresh fallback
      const fetchJob = async () => {
        try {
          const res = await api.get(`/api/jobs/${id}`);
          setFormData(res.data);
        } catch {
          alert("Failed to load job details");
        } finally {
          setLoading(false);
        }
      };
      fetchJob();
    }
  }, [id, location.state]);

  /* ================= CHANGE HANDLER ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/jobs/${id}`, formData);
      alert("Job updated successfully");
      navigate("/admin/jobs");
    } catch {
      alert("Failed to update job");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020c1b] text-white">
        Loading job data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020c1b] text-white">
      <AdminNavbar />

      <div className="max-w-4xl mx-auto pt-28 px-6 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-yellow-400 mb-8 hover:underline"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="text-3xl font-black mb-8">
          Edit <span className="text-yellow-400">Job</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#112240]/50 border border-white/10 p-8 rounded-2xl"
        >
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full p-3 rounded bg-[#0a192f] border border-white/10"
            required
          />

          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full p-3 rounded bg-[#0a192f] border border-white/10"
            required
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 rounded bg-[#0a192f] border border-white/10"
            required
          />

          <input
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="w-full p-3 rounded bg-[#0a192f] border border-white/10"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#0a192f] border border-white/10"
          >
            <option value="">Select Job Type</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Job Description"
            className="w-full p-3 rounded bg-[#0a192f] border border-white/10"
            required
          />

          <button
            type="submit"
            className="flex items-center gap-2 bg-yellow-400 text-[#020c1b] px-6 py-3 rounded-xl font-bold hover:bg-white transition"
          >
            <Save size={18} /> Update Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditJob;
