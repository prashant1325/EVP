import { useState } from "react";

const MIN_EVP = 300;
const MAX_EVP = 900;

const AddEmployeeForm = ({ onClose, onSave }) => {
  const generateEVPScore = () =>
    Math.floor(Math.random() * (MAX_EVP - MIN_EVP + 1)) + MIN_EVP;

  const [form, setForm] = useState({
    name: "",
    gender: "",
    age: "",
    address: "",
    salary: "",
    photo: "",
    offerLetter: "",
    salarySlip: "",
    signature: "",
    evpScore: generateEVPScore(),
  });

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Enforce EVP range
    if (name === "evpScore") {
      const num = Number(value);
      if (num < MIN_EVP || num > MAX_EVP) return;
      setForm({ ...form, evpScore: num });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  /* ================= HANDLE FILE ================= */
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    const file = files[0];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setForm((p) => ({ ...p, [name]: reader.result }));
      reader.readAsDataURL(file);
    } else {
      setForm((p) => ({ ...p, [name]: URL.createObjectURL(file) }));
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Final safety check
    if (form.evpScore < MIN_EVP || form.evpScore > MAX_EVP) {
      alert("EVP Score must be between 300 and 900");
      return;
    }

    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-lg bg-[#112240] rounded-2xl border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-xl font-bold text-yellow-400">
            Add Employee
          </h2>
        </div>

        {/* BODY */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              placeholder="Employee Name"
              className="w-full p-3 bg-[#1b2b45] rounded-lg"
              onChange={handleChange}
              required
            />

            <select
              name="gender"
              className="w-full p-3 bg-[#1b2b45] rounded-lg"
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input
              name="age"
              type="number"
              placeholder="Age"
              className="w-full p-3 bg-[#1b2b45] rounded-lg"
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Address"
              rows={2}
              className="w-full p-3 bg-[#1b2b45] rounded-lg"
              onChange={handleChange}
              required
            />

            <input
              name="salary"
              type="number"
              placeholder="Salary"
              className="w-full p-3 bg-[#1b2b45] rounded-lg"
              onChange={handleChange}
              required
            />

            {/* EVP SCORE (ADJUSTABLE, LIMITED) */}
            <div className="space-y-2">
              <label className="text-sm text-gray-300">
                EVP Score (300 – 900)
              </label>

              {/* Number input */}
              <input
                type="number"
                name="evpScore"
                min={MIN_EVP}
                max={MAX_EVP}
                value={form.evpScore}
                onChange={handleChange}
                className="w-full p-3 bg-[#0b1628] text-yellow-400 font-bold rounded-lg"
              />

              {/* Range slider */}
              <input
                type="range"
                min={MIN_EVP}
                max={MAX_EVP}
                value={form.evpScore}
                onChange={handleChange}
                name="evpScore"
                className="w-full accent-yellow-400"
              />
            </div>

            {[
              ["photo", "Photo", "image/*"],
              ["offerLetter", "Offer Letter (PDF)", "application/pdf"],
              ["salarySlip", "Salary Slip (PDF)", "application/pdf"],
              ["signature", "Signature", "image/*"],
            ].map(([name, label, accept]) => (
              <div key={name}>
                <label className="text-sm text-gray-300">{label}</label>
                <input
                  type="file"
                  name={name}
                  accept={accept}
                  className="w-full p-2 bg-[#1b2b45] rounded-lg"
                  onChange={handleFileChange}
                />
              </div>
            ))}
          </form>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-yellow-400 text-[#020c1b] font-bold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
