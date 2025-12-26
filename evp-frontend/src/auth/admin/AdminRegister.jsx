import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  X,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

const AdminRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    gstNumber: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    businessType: "",
    yearsInBusiness: "",
    productsInterested: "",
    idProofType: "",
    idProofNumber: "",
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    tradeLicenseNumber: "",
    contactPersonName: "",
    designation: "",
    alternateContact: "",
    gpsCoordinates: "",
    password: "",
  });

  const [idProofFile, setIdProofFile] = useState(null);
  const [locationPhoto, setLocationPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  /* ================= HELPERS ================= */
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    setter(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ⚠️ JSON only for now (file upload later with multipart)
      const res = await fetch("http://localhost:5000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      showNotification("Registration successful! Redirecting...", "success");
      setTimeout(() => navigate("/admin/login"), 1500);
    } catch (err) {
      showNotification(err.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================= NOTIFICATION ================= */}
      {notification.message && (
        <div
          className={`fixed top-5 left-1/2 z-50 -translate-x-1/2
          px-6 py-3 rounded-lg shadow-lg flex items-center gap-3
          text-sm font-medium
          ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <span>{notification.message}</span>
          <button onClick={() => setNotification({ message: "", type: "" })}>
            <X size={16} />
          </button>
        </div>
      )}

      <div className="min-h-screen bg-slate-900 text-white px-6 py-12">
        <div className="max-w-5xl mx-auto bg-white/10 border border-white/10 rounded-xl p-8">

          {/* BACK */}
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-yellow-400 mb-6"
          >
            <ArrowLeft size={16} /> Back to portal selection
          </Link>

          <h1 className="text-3xl font-bold mb-2">Admin Registration</h1>
          <p className="text-gray-300 mb-8">
            Register your organization for Employee Verification Portal access
          </p>

          <form className="space-y-10" onSubmit={handleSubmit}>

            {/* ================= BASIC INFO ================= */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-yellow-400">
                Basic Information
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <input name="fullName" onChange={handleChange} className="input" placeholder="Full Name" required />
                <input name="companyName" onChange={handleChange} className="input" placeholder="Company Name (if applicable)" />
                <input name="gstNumber" onChange={handleChange} className="input" placeholder="GST Number (optional)" />
                <input name="phone" onChange={handleChange} className="input" placeholder="Phone Number" required />
                <input name="email" onChange={handleChange} className="input md:col-span-2" placeholder="Email Address" required />
                <input name="address" onChange={handleChange} className="input md:col-span-2" placeholder="Physical Address (Billing & Shipping)" />
                <input name="city" onChange={handleChange} className="input" placeholder="City" />
                <input name="state" onChange={handleChange} className="input" placeholder="State" />
                <input name="postalCode" onChange={handleChange} className="input" placeholder="Postal Code" />
              </div>
            </section>

            {/* ================= BUSINESS ================= */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-yellow-400">
                Business Details
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <select name="businessType" onChange={handleChange} className="input">
                  <option value="">Business Type</option>
                  <option>Retailer</option>
                  <option>Distributor</option>
                  <option>Contractor</option>
                  <option>OEM</option>
                </select>
                <input name="yearsInBusiness" onChange={handleChange} className="input" placeholder="Years in Business" />
                <input name="productsInterested" onChange={handleChange} className="input md:col-span-2" placeholder="Products Interested / Purchased" />
              </div>
            </section>

            {/* ================= KYC ================= */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-yellow-400">
                Identification & KYC
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <select name="idProofType" onChange={handleChange} className="input">
                  <option value="">ID Proof Type</option>
                  <option>Aadhar</option>
                  <option>PAN</option>
                  <option>Voter ID</option>
                  <option>Passport</option>
                  <option>Driving License</option>
                </select>
                <input name="idProofNumber" onChange={handleChange} className="input" placeholder="ID Proof Number" />

                {!idProofFile ? (
                  <label className="upload md:col-span-2">
                    <Upload size={18} /> Upload ID Proof
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFile(e, setIdProofFile)}
                    />
                  </label>
                ) : (
                  <div className="md:col-span-2 flex justify-between items-center bg-slate-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-blue-400" />
                      <span>{idProofFile.name}</span>
                    </div>
                    <button type="button" onClick={() => setIdProofFile(null)}>
                      <X />
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* ================= BANK ================= */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-yellow-400">
                Bank Details
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <input name="bankName" onChange={handleChange} className="input" placeholder="Bank Name" />
                <input name="accountHolderName" onChange={handleChange} className="input" placeholder="Account Holder Name" />
                <input name="accountNumber" onChange={handleChange} className="input" placeholder="Account Number" />
                <input name="ifscCode" onChange={handleChange} className="input" placeholder="IFSC Code" />
              </div>
            </section>

            {/* ================= OTHER DETAILS ================= */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-yellow-400">
                Other Details
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                <input name="tradeLicenseNumber" onChange={handleChange} className="input" placeholder="Trade License / Udyam Registration Number" />
                <input name="contactPersonName" onChange={handleChange} className="input" placeholder="Contact Person Name" />
                <input name="designation" onChange={handleChange} className="input" placeholder="Designation" />
                <input name="alternateContact" onChange={handleChange} className="input" placeholder="Alternate Contact (Phone / Email)" />
                <input name="gpsCoordinates" onChange={handleChange} className="input md:col-span-2" placeholder="GPS Coordinates (Lat, Long)" />

                {!locationPhoto ? (
                  <label className="upload md:col-span-2">
                    <ImageIcon size={18} /> Upload Delivery Location Photo
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleFile(e, setLocationPhoto)}
                    />
                  </label>
                ) : (
                  <div className="md:col-span-2 flex justify-between items-center bg-slate-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <ImageIcon size={18} className="text-green-400" />
                      <span>{locationPhoto.name}</span>
                    </div>
                    <button type="button" onClick={() => setLocationPhoto(null)}>
                      <X />
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* ================= SECURITY ================= */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-yellow-400">
                Security
              </h2>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                required
                className="input w-full"
                placeholder="Create Password"
              />
            </section>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-400 font-semibold transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Submit Registration"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
