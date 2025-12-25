import { Routes, Route } from "react-router-dom";

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

const AppRoutes = () => {
  return (
    <Routes>
      {/* ===== PUBLIC PAGES ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />

      {/* ===== USER ===== */}
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />

      {/* ===== ADMIN ===== */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />

      {/* ===== SUPER ADMIN ===== */}
      <Route path="/superadmin/login" element={<SuperAdminLogin />} />
      <Route path="/superadmin/register" element={<SuperAdminRegister />} />

      {/* ===== 404 ===== */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center text-white">
            <h1 className="text-3xl font-bold">404 – Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
