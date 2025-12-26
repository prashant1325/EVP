import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiStar,
  FiMapPin,
  FiLoader,
  FiShield,
  FiZap,
  FiTrendingUp,
  FiUsers,
  FiBriefcase,
  FiGlobe
} from "react-icons/fi";
import api from "../api/axios";
import heroBg from "../assets/images/bg.png";
import logo from "../assets/images/sticker-logo.png";
import ApplyJobModal from "../components/ApplyJobModal";

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const Home = () => {
  const [liveJobs, setLiveJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  /* ================= FETCH APPROVED JOBS ================= */
  useEffect(() => {
    const fetchLiveJobs = async () => {
      try {
        const res = await api.get("/api/jobs/approved");

        // ✅ FIX FOR PRODUCTION (NETLIFY)
        setLiveJobs(res.data.jobs?.slice(0, 3) || []);
      } catch (error) {
        console.error("Error fetching jobs for home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveJobs();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a192f] text-white selection:bg-yellow-400 selection:text-black font-sans">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0 bg-cover bg-right md:bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        <div
          className="absolute inset-0 z-10 bg-[#0a192f] md:bg-gradient-to-br md:from-[#0a192f] md:via-[#0a192f] md:to-[#112240]/80"
          style={{ clipPath: "polygon(0 0, 70% 0, 50% 100%, 0% 100%)" }}
        />

        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center relative z-20 px-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="hidden md:flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-yellow-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <img src={logo} alt="Logo" className="relative h-48 drop-shadow-2xl" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <motion.span className="inline-block text-yellow-400 font-bold tracking-widest uppercase text-sm mb-4 border-b-2 border-yellow-400/30 pb-1">
              Verified Reputation
            </motion.span>

            <h1 className="text-5xl md:text-7xl font-black mb-8">
              Trust the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                EVP Score
              </span>
            </h1>

            <p className="text-xl text-slate-300 max-w-lg mb-12">
              Bridging the gap between Hiring and Verifying with India's most
              advanced employment credit system.
            </p>

            <div className="flex gap-6">
              <Link
                to="/login"
                className="bg-yellow-400 text-[#0a192f] px-10 py-5 rounded-xl font-black text-lg hover:bg-white transition-all flex items-center"
              >
                Get Certified <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= JOBS SECTION ================= */}
      <section className="py-32 px-6 bg-[#0a192f]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-2">Latest Verified Jobs</h2>
              <p className="text-slate-400">
                Opportunities from high-EVP rated companies
              </p>
            </div>
            <Link
              to="/jobs"
              className="text-yellow-400 font-bold flex items-center gap-2 hover:underline"
            >
              Explore All <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-20">
              <FiLoader className="w-10 h-10 text-yellow-400 animate-spin mb-4" />
              <p className="uppercase text-xs tracking-widest text-slate-500">
                Syncing with Job Board...
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {liveJobs.length > 0 ? (
                liveJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    whileHover={{ y: -10 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between"
                  >
                    <div>
                      <span className="bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        {job.type || "Full Time"}
                      </span>

                      <h3 className="text-2xl font-bold mt-4 mb-2">
                        {job.title}
                      </h3>

                      <p className="text-slate-300 mb-4 flex items-center">
                        <FiCheckCircle className="inline mr-2 text-green-400" />
                        {job.company}
                      </p>

                      <div className="flex items-center text-slate-500 text-sm">
                        <FiMapPin className="mr-2" /> {job.location}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedJob(job)}
                      className="mt-8 w-full bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
                    >
                      Apply Now
                    </button>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-slate-500 col-span-3 py-10">
                  No approved jobs found at the moment.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {selectedJob && (
        <ApplyJobModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default Home;
