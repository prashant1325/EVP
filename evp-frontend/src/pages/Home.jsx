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

// Animation Variants
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

  // Fetch approved jobs
  useEffect(() => {
    const fetchLiveJobs = async () => {
      try {
        const res = await api.get("/api/jobs/approved");
        setLiveJobs(res.data.slice(0, 3));
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

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-32 bg-[#0a192f] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose EVP?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We are revolutionizing employment verification with blockchain-grade security and real-time reputation tracking.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <FiShield className="w-8 h-8 text-yellow-400" />,
                title: "Verified Identity",
                desc: "Every professional on our platform is pre-vetted against national databases and employment history."
              },
              {
                icon: <FiZap className="w-8 h-8 text-yellow-400" />,
                title: "Instant Verification",
                desc: "Reduce background check time from weeks to seconds with our proprietary digital credit system."
              },
              {
                icon: <FiTrendingUp className="w-8 h-8 text-yellow-400" />,
                title: "Career Growth",
                desc: "A high EVP score gives you priority access and higher trust ratings with top-tier MNCs."
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-b from-[#112240] to-transparent border border-white/5 hover:border-yellow-400/30 transition-colors"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= JOBS SECTION ================= */}
      <section className="py-32 px-6 bg-[#0a192f]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-2">Latest Verified Jobs</h2>
              <p className="text-slate-400">Opportunities from high-EVP rated companies</p>
            </div>
            <Link to="/jobs" className="text-yellow-400 font-bold flex items-center gap-2 hover:underline">
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

                      <h3 className="text-2xl font-bold mt-4 mb-2">{job.title}</h3>

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

      {/* ================= STATS SECTION ================= */}
      <section className="py-20 border-y border-white/10 bg-[#112240]/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Active Professionals", value: "50K+" },
            { label: "Partner Companies", value: "120+" },
            { label: "Successful Hires", value: "12K+" },
            { label: "Trust Score", value: "99.9%" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-black text-yellow-400 mb-2">{stat.value}</div>
              <div className="text-slate-400 text-sm uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-yellow-400 to-yellow-600 p-12 md:p-20 text-center text-[#0a192f] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Ready to boost your <br/> professional credit?</h2>
            <p className="text-lg font-medium mb-10 opacity-90 max-w-2xl mx-auto text-[#0a192f]/80">
              Join thousands of professionals who are securing their future with the EVP Score. 
              Start your certification journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login" className="bg-[#0a192f] text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                Create Free Account
              </Link>
              <Link to="/about" className="bg-white/20 backdrop-blur-md border border-black/10 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/40 transition-all">
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-12 border-t border-white/5 bg-[#0a192f] text-slate-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="h-8 opacity-50 grayscale" />
            <p>© 2025 EVP Score. India's First Employment Credit System.</p>
          </div>
          <div className="flex gap-8 font-medium">
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Security</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

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