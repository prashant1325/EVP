import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "../assets/images/sticker-logo.png";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* ================= TOP FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">

        {/* ===== BRAND ===== */}
        <div>
          <img
            src={logo}
            alt="EVP Logo"
            className="h-14 mb-4"
          />
          <p className="text-sm leading-relaxed">
            Employee Verification Portal helps employers, employees and
            financial institutions make reliable hiring and lending decisions
            using trusted performance data.
          </p>
        </div>

        {/* ===== QUICK LINKS ===== */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-400 transition">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>
            </li>
          </ul>
        </div>

        {/* ===== PORTALS ===== */}
        <div>
          <h3 className="text-white font-semibold mb-4">Portals</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/login" className="hover:text-yellow-400 transition">
                Employer Portal
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-400 transition">
                Employee Portal
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-400 transition">
                Lender Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* ===== CONTACT ===== */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <MapPin size={18} className="text-yellow-400" />
              <span>India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-yellow-400" />
              <span>+91 XXXXX XXXXX</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-yellow-400" />
              <span>support@evp.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ================= BOTTOM FOOTER ================= */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>
            © {new Date().getFullYear()} Employee Verification Portal. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-yellow-400 transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-yellow-400 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
