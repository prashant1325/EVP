import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "../assets/images/bg.png";
import logo from "../assets/images/sticker-logo.png";

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* ================= SAMPLE JOB DATA ================= */
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Fixkart Pvt Ltd",
    location: "Bangalore",
    type: "Full Time",
    rating: "4.2",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "SRF Group",
    location: "Delhi",
    type: "Full Time",
    rating: "4.5",
  },
  {
    id: 3,
    title: "HR Executive",
    company: "ABC Corporation",
    location: "Mumbai",
    type: "Part Time",
    rating: "4.0",
  },
];

const Home = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="min-h-screen bg-black/60 pt-24 text-white">

        {/* ================= HERO ================= */}
        <section className="px-6 min-h-[75vh] flex items-center">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

            <motion.img
              src={logo}
              alt="Employee Verification Portal"
              className="h-40 md:h-52 mx-auto md:mx-0 drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                India’s Trusted{" "}
                <span className="text-yellow-400">
                  Employee Verification
                </span>{" "}
                Platform
              </h1>

              <p className="text-lg text-gray-200 max-w-xl mb-8">
                A single EVP score trusted by employers, employees, and
                financial institutions to make hiring, career, and lending
                decisions safer and smarter.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/login"
                  className="bg-blue-700 px-6 py-3 rounded-lg hover:bg-blue-600 transition hover:scale-105"
                >
                  Login
                </Link>

                <Link
                  to="/login"
                  className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= FOR WHO ================= */}
        <section className="py-20 px-6 bg-slate-900/80 backdrop-blur">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-14"
            >
              Built for Every Stakeholder
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "For Employers",
                  desc: "Verify candidates, manage performance, reduce hiring risks.",
                },
                {
                  title: "For Employees",
                  desc: "Carry your verified work reputation across jobs.",
                },
                {
                  title: "For Lenders & Insurers",
                  desc: "Assess employment stability using EVP score.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-white/10 border border-white/10 p-8 rounded-xl hover:-translate-y-2 hover:bg-white/15 transition"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-14"
            >
              How EVP Works
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-10 text-center">
              {[
                { step: "01", title: "Register", desc: "Create an account securely." },
                { step: "02", title: "Verify", desc: "Employers verify work history." },
                { step: "03", title: "Score", desc: "EVP score is generated." },
                { step: "04", title: "Use", desc: "Use EVP for jobs or loans." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                  <span className="text-yellow-400 text-3xl font-bold">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-300 mt-2">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= VERIFIED JOBS ================= */}
        <section className="py-20 px-6 bg-slate-900/80">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-14"
            >
              Verified Job Opportunities
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-white/10 p-6 rounded-xl border border-white/10 hover:scale-105 transition"
                >
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <p className="text-gray-300">{job.company}</p>
                  <p className="text-sm text-gray-400">{job.location}</p>

                  <div className="flex justify-between mt-4 text-sm">
                    <span className="text-yellow-400">{job.type}</span>
                    <span>⭐ {job.rating}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="py-20 px-6 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-center">
            {[
              { value: "10K+", label: "Employees Verified" },
              { value: "1K+", label: "Employers Onboarded" },
              { value: "500+", label: "Lenders Trust EVP" },
              { value: "99.9%", label: "Verification Accuracy" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl font-bold text-yellow-400">
                  {stat.value}
                </h3>
                <p className="text-gray-300 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-24 px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Start Building Trust Today
            </h2>
            <p className="text-gray-300 mb-8">
              EVP helps employers, employees, and lenders make confident decisions.
            </p>
            <Link
              to="/login"
              className="inline-block bg-yellow-400 text-black px-10 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition hover:scale-105"
            >
              Get Started Now
            </Link>
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default Home;
