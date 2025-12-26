import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiPlusSquare,
  FiList,
  FiLogOut,
  FiShield,
  FiUsers,
} from "react-icons/fi";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* 🔥 REMOVE PUBLIC NAVBAR OFFSET */
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) root.style.paddingTop = "0px";

    return () => {
      if (root) root.style.paddingTop = "";
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  const linkClass = (path) =>
    location.pathname === path
      ? "flex items-center gap-2 text-yellow-400 font-bold bg-yellow-400/15 px-5 py-2.5 rounded-xl transition-all shadow-inner shadow-yellow-400/5"
      : "flex items-center gap-2 text-slate-400 hover:text-white hover:bg-white/5 px-5 py-2.5 rounded-xl transition-all active:scale-95";

  return (
    <nav className="sticky top-0 w-full bg-[#0a192f]/90 backdrop-blur-md border-b border-white/[0.08] px-6 md:px-12 py-4 flex justify-between items-center z-[100] shadow-[0_10px_30px_-15px_rgba(2,12,27,0.7)]">
      
      {/* ===== LEFT: BRANDING ===== */}
      <div
        onClick={() => navigate("/admin/dashboard")}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="bg-yellow-400 p-2.5 rounded-xl group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-yellow-400/20">
          <FiShield className="text-[#0a192f] text-xl stroke-[2.5px]" />
        </div>
        <div className="flex flex-col leading-none">
          <h1 className="text-lg font-black tracking-tighter text-white uppercase italic">
            Admin<span className="text-yellow-400">Panel</span>
          </h1>
          <span className="text-[10px] text-yellow-400/50 font-bold tracking-[0.2em] uppercase">Control Center</span>
        </div>
      </div>

      {/* ===== CENTER: NAV LINKS ===== */}
      <div className="hidden lg:flex gap-1 items-center bg-[#112240]/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-sm">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className={linkClass("/admin/dashboard")}
        >
          <FiGrid size={18} />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => navigate("/admin/post-job")}
          className={linkClass("/admin/post-job")}
        >
          <FiPlusSquare size={18} />
          <span>Post Job</span>
        </button>

        <button
          onClick={() => navigate("/admin/jobs")}
          className={linkClass("/admin/jobs")}
        >
          <FiList size={18} />
          <span>Job List</span>
        </button>

        <button
          onClick={() => navigate("/admin/applications")}
          className={linkClass("/admin/applications")}
        >
          <FiUsers size={18} />
          <span>Applications</span>
        </button>
      </div>

      {/* ===== RIGHT: LOGOUT ===== */}
      <div className="flex items-center gap-4">
        {/* Subtle separator for large screens */}
        <div className="hidden lg:block h-6 w-[1px] bg-white/10 mx-2" />
        
        <button
          onClick={logout}
          className="group flex items-center gap-2 bg-red-500/10 text-red-500 px-5 py-2.5 rounded-xl font-bold border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-300 active:scale-95 shadow-lg hover:shadow-red-500/20"
        >
          <FiLogOut className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;