import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <div className="text-white overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto px-6 text-center pt-32"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Employee Verification Portal
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            A trusted digital bridge between verified careers,
            responsible hiring, and smarter financial decisions.
          </p>
        </motion.div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Employee Verification Portal (EVP) is a secure platform
              designed to create transparency and accountability
              across the employment ecosystem.
            </p>
            <p className="text-slate-300 leading-relaxed">
              We connect employers, employees, and financial institutions
              through verified employment intelligence.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-slate-800/70 backdrop-blur border border-white/10 p-8 rounded-xl hover:scale-[1.02] transition"
          >
            <h3 className="text-xl font-semibold mb-4 text-yellow-300">
              Why EVP Exists
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li>• Prevent resume fraud & false claims</li>
              <li>• Enable fair hiring decisions</li>
              <li>• Create portable verified careers</li>
              <li>• Support lending risk assessment</li>
            </ul>
          </motion.div>

        </div>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-14"
          >
            What We Do
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Employer Verification",
                desc: "Secure performance ratings across behaviour, productivity, and attendance.",
              },
              {
                title: "Employee Empowerment",
                desc: "Verified EVP profiles employees can carry across jobs.",
              },
              {
                title: "Financial Insights",
                desc: "Consent-based EVP scores for banks and NBFCs.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-slate-800/70 border border-white/10 p-8 rounded-xl hover:-translate-y-2 hover:bg-slate-700/70 transition"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CORE PRINCIPLES ================= */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-14"
          >
            Our Core Principles
          </motion.h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              "Trust & Transparency",
              "Data Privacy & Consent",
              "Security by Design",
              "Ethical Scoring",
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/70 border border-white/10 p-6 rounded-xl hover:scale-105 transition"
              >
                <p className="font-semibold text-slate-200">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-gradient-to-r from-blue-900 to-slate-900 text-center px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">
            Join the Future of Verified Employment
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Build trust. Reduce risk. Empower careers.
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default About;
