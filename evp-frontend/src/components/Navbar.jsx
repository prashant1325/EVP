import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import logo from "../assets/images/sticker-logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  /* ================= HOME PAGE SCROLL EFFECT ================= */
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  /* ================= HIDE NAVBAR ON DASHBOARD ROUTES ================= */
  if (
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/superadmin") ||
    location.pathname.startsWith("/user/dashboard")
  ) {
    return null;
  }

  const linkClass = (path) =>
    `relative pb-1 transition-all duration-300 ${
      location.pathname === path
        ? "text-yellow-400 after:w-full"
        : "hover:text-yellow-400 after:w-0 hover:after:w-full"
    }
    after:content-[''] after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:bg-yellow-400 after:transition-all after:duration-300`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isHome
          ? scrolled
            ? "bg-slate-900/95 backdrop-blur shadow-lg"
            : "bg-transparent"
          : "bg-slate-900 shadow-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="EVP Logo"
            className="h-14 md:h-16 object-contain"
          />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 text-white">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/about" className={linkClass("/about")}>About</Link>

          <Link
            to="/contact"
            className={`${linkClass("/contact")} flex items-center gap-2`}
          >
            <Phone size={18} />
            Contact
          </Link>

          <Link
            to="/login"
            className="bg-yellow-400 text-black px-5 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
          >
            Login
          </Link>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-slate-900 px-6 pb-6 pt-4 space-y-4 text-white">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <Phone size={18} /> Contact
          </Link>

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block bg-yellow-400 text-black px-4 py-2 rounded text-center font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
