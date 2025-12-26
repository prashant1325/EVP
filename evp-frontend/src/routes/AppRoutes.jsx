import { Routes, Route } from "react-router-dom";

/* ===== PUBLIC PAGES ===== */
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";

/* ===== USER AUTH ===== */
import UserLogin from "../auth/user/UserLogin";
import UserRegister from "../auth/user/UserRegister";

/* ===== ADMIN AUTH ===== */
import AdminLogin from "../auth/admin/AdminLogin";
import AdminRegister from "../auth/admin/AdminRegister";

/* ===== SUPER ADMIN AUTH ===== */
import SuperAdminLogin from "../auth/superadmin/SuperAdminLogin";
import SuperAdminRegister from "../auth/superadmin/SuperAdminRegister";

/* ===== DASHBOARDS ===== */
import UserDashboard from "../dashboards/UserDashboard";
import AdminDashboard from "../dashboards/AdminDashboard";
import SuperAdminDashboard from "../dashboards/SuperAdminDashboard";

/* ===== ADMIN JOB MANAGEMENT ===== */
import AdminPostJob from "../components/admin/AdminPostJob";
import AdminJobList from "../components/admin/AdminJobList";
import AdminEditJob from "../components/admin/AdminEditJob";
import AdminApplications from "../components/admin/AdminApplications"; // ✅ ADD

/* ===== PROTECTED ROUTE ===== */
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />

      {/* ================= USER AUTH ================= */}
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />

      {/* ================= ADMIN AUTH ================= */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />

      {/* ================= SUPER ADMIN AUTH ================= */}
      <Route path="/superadmin/login" element={<SuperAdminLogin />} />
      <Route path="/superadmin/register" element={<SuperAdminRegister />} />

      {/* ================= USER DASHBOARD ================= */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN DASHBOARD ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN JOB MANAGEMENT ================= */}
      <Route
        path="/admin/post-job"
        element={
          <ProtectedRoute role="admin">
            <AdminPostJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/jobs"
        element={
          <ProtectedRoute role="admin">
            <AdminJobList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/jobs/edit/:id"
        element={
          <ProtectedRoute role="admin">
            <AdminEditJob />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN APPLICATIONS ================= */}
      <Route
        path="/admin/applications"
        element={
          <ProtectedRoute role="admin">
            <AdminApplications />
          </ProtectedRoute>
        }
      />

      {/* ================= SUPER ADMIN DASHBOARD ================= */}
      <Route
        path="/superadmin/dashboard"
        element={
          <ProtectedRoute role="superadmin">
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ================= 404 ================= */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
            <h1 className="text-3xl font-bold">404 – Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
