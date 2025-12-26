import { Routes, Route } from "react-router-dom";

/* ===== PUBLIC PAGES ===== */
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";

/* ===== USER AUTH ===== */
import UserLogin from "../auth/user/UserLogin";

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
import AdminApplications from "../components/admin/AdminApplications";

/* ===== PROTECTED ROUTES ===== */
// ✅ ADMIN guard (existing file)
import AdminProtectedRoute from "../components/ProtectedRoute";
// ✅ USER guard (new file)
import UserProtectedRoute from "../components/UserProtectedRoute";

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
          <UserProtectedRoute>
            <UserDashboard />
          </UserProtectedRoute>
        }
      />

      {/* ================= ADMIN DASHBOARD ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      {/* ================= ADMIN JOB MANAGEMENT ================= */}
      <Route
        path="/admin/post-job"
        element={
          <AdminProtectedRoute>
            <AdminPostJob />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/jobs"
        element={
          <AdminProtectedRoute>
            <AdminJobList />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/jobs/edit/:id"
        element={
          <AdminProtectedRoute>
            <AdminEditJob />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/applications"
        element={
          <AdminProtectedRoute>
            <AdminApplications />
          </AdminProtectedRoute>
        }
      />

      {/* ================= SUPER ADMIN DASHBOARD ================= */}
      <Route
        path="/superadmin/dashboard"
        element={
          <AdminProtectedRoute>
            <SuperAdminDashboard />
          </AdminProtectedRoute>
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
