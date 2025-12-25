import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

const Contact = () => {
  return (
    <div className="text-white overflow-hidden">

      {/* ===== HEADER ===== */}
      <section className="min-h-[60vh] bg-gradient-to-b from-slate-900 to-slate-800 flex items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-6 text-center pt-32"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto">
            Have a question or need assistance?  
            Our team is here to help you.
          </p>
        </motion.div>
      </section>

      {/* ===== CONTACT CONTENT ===== */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-5xl mx-auto px-6 grid gap-10 md:grid-cols-2">

          {/* CONTACT INFO */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-slate-800/70 backdrop-blur border border-white/10 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-semibold mb-6">
              Our Contact Details
            </h2>

            <div className="space-y-5 text-slate-300">
              <div className="flex items-center gap-4 hover:text-white transition">
                <Phone className="text-yellow-400" size={22} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-4 hover:text-white transition">
                <Mail className="text-yellow-400" size={22} />
                <span>support@evp.com</span>
              </div>

              <div className="flex items-center gap-4 hover:text-white transition">
                <MapPin className="text-yellow-400" size={22} />
                <span>New Delhi, India</span>
              </div>
            </div>

            <p className="mt-8 text-sm text-slate-400">
              We usually respond within 24 business hours.
            </p>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-slate-800/70 backdrop-blur border border-white/10 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-semibold mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded bg-slate-900 border border-slate-700
                           text-white placeholder-slate-400 focus:outline-none
                           focus:border-yellow-400 transition"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded bg-slate-900 border border-slate-700
                           text-white placeholder-slate-400 focus:outline-none
                           focus:border-yellow-400 transition"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded bg-slate-900 border border-slate-700
                           text-white placeholder-slate-400 focus:outline-none
                           focus:border-yellow-400 transition"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-black py-3 rounded
                           font-semibold hover:bg-yellow-300 hover:scale-[1.02]
                           transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
