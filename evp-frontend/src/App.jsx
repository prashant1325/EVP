import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminFooter from "./components/admin/AdminFooter";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();

  // 🔐 Detect admin routes
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/superadmin");

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">

      {/* Scroll Fix */}
      <ScrollToTop />

      {/* Navbar (already hidden internally for admin) */}
      <Navbar />

      {/* Page Content */}
      <main className="pt-24 flex-grow">
        <AppRoutes />
      </main>

      {/* Footer */}
      {!isAdminRoute && <Footer />}
      {isAdminRoute && <AdminFooter />}
    </div>
  );
}

export default App;
