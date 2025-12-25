import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload } from "lucide-react";

const AdminRegister = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white/10 border border-white/10 rounded-xl p-8">

        {/* ===== BACK ===== */}
        <Link
          to="/login"
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-400 mb-6"
        >
          <ArrowLeft size={16} />
          Back to portal selection
        </Link>

        {/* ===== HEADER ===== */}
        <h1 className="text-3xl font-bold mb-2">Admin Registration</h1>
        <p className="text-gray-300 mb-8">
          Register your organization for Employee Verification Portal access
        </p>

        {/* ===== FORM ===== */}
        <form className="space-y-10">

          {/* ================= BASIC INFORMATION ================= */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">
              Basic Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input className="input" placeholder="Full Name" />
              <input className="input" placeholder="Company Name" />
              <input className="input" placeholder="GST Number (optional)" />
              <input className="input" placeholder="Phone Number" />
              <input className="input md:col-span-2" placeholder="Email Address" />
              <input className="input md:col-span-2" placeholder="Physical Address" />
              <input className="input" placeholder="City" />
              <input className="input" placeholder="State" />
              <input className="input" placeholder="Postal Code" />
            </div>
          </section>

          {/* ================= BUSINESS DETAILS ================= */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">
              Business Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <select className="input">
                <option>Business Type</option>
                <option>Retailer</option>
                <option>Distributor</option>
                <option>Contractor</option>
                <option>OEM</option>
              </select>

              <input className="input" placeholder="Years in Business" />
              <input
                className="input md:col-span-2"
                placeholder="Products Interested / Purchased"
              />
            </div>
          </section>

          {/* ================= KYC DETAILS ================= */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">
              Identification & KYC
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <select className="input">
                <option>ID Proof Type</option>
                <option>Aadhar</option>
                <option>PAN</option>
                <option>Voter ID</option>
                <option>Passport</option>
                <option>Driving License</option>
              </select>

              <input className="input" placeholder="ID Proof Number" />

              <label className="upload">
                <Upload size={18} />
                Upload ID Proof
                <input type="file" hidden />
              </label>
            </div>
          </section>

          {/* ================= BANK DETAILS ================= */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">
              Bank Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input className="input" placeholder="Bank Name" />
              <input className="input" placeholder="Account Holder Name" />
              <input className="input" placeholder="Account Number" />
              <input className="input" placeholder="IFSC Code" />
            </div>
          </section>

          {/* ================= ADDITIONAL DETAILS ================= */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">
              Additional Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <input className="input" placeholder="Trade License / Udyam Number" />
              <input className="input" placeholder="Contact Person Name" />
              <input className="input" placeholder="Designation" />
              <input className="input" placeholder="Alternate Phone / Email" />
              <input className="input" placeholder="GPS Coordinates (Lat, Long)" />

              <label className="upload md:col-span-2">
                <Upload size={18} />
                Upload Delivery Location Photo
                <input type="file" hidden />
              </label>
            </div>
          </section>

          {/* ================= SUBMIT ================= */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-400 font-semibold tracking-wide transition"
          >
            Submit Registration
          </button>
        </form>
      </div>

      {/* ===== TAILWIND UTILITIES ===== */}
      <style>
        {`
          .input {
            background: rgb(15 23 42);
            border: 1px solid rgb(51 65 85);
            padding: 0.75rem;
            border-radius: 0.5rem;
            outline: none;
            color: white;
          }
          .input:focus {
            border-color: rgb(96 165 250);
          }
          .upload {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: rgb(15 23 42);
            border: 1px dashed rgb(71 85 105);
            padding: 0.75rem;
            border-radius: 0.5rem;
            cursor: pointer;
            color: rgb(203 213 225);
          }
          .upload:hover {
            border-color: rgb(96 165 250);
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default AdminRegister;
