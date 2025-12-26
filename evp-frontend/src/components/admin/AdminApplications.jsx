import { useEffect, useState } from "react";
import api from "../../api/axios";
import AdminNavbar from "./AdminNavbar";
import {
  User,
  GraduationCap,
  Briefcase,
  Download,
} from "lucide-react";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/api/applications");
        setApplications(res.data);
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <AdminNavbar />

      <div className="max-w-6xl mx-auto pt-28 px-6">
        <h1 className="text-3xl font-bold mb-8">Job Applications</h1>

        {applications.length === 0 ? (
          <p className="text-slate-400">No applications received yet.</p>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-slate-800 border border-white/10 rounded-xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  {/* Applicant Info */}
                  <div>
                    <p className="flex items-center gap-2 text-lg font-semibold">
                      <User size={18} /> {app.name}
                    </p>
                    <p className="flex items-center gap-2 text-slate-400">
                      <GraduationCap size={16} /> {app.college}
                    </p>
                  </div>

                  {/* Job Info */}
                  <div>
                    <p className="flex items-center gap-2">
                      <Briefcase size={16} />
                      {app.jobId?.title} – {app.jobId?.company}
                    </p>
                    <p className="text-sm text-slate-400">
                      Applied on{" "}
                      {new Date(app.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* CV */}
                  <a
                    href={`http://localhost:5000/${app.cvUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-yellow-400 hover:underline"
                  >
                    <Download size={18} />
                    View CV
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;
