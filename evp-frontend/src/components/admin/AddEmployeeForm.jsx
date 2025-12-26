import { useState } from "react";

const AddEmployeeForm = ({ onClose, onSave }) => {
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
  });

  // Handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file uploads (image / pdf)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;

    const file = files[0];

    // Image preview
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      // PDF / other files
      const fileURL = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, [name]: fileURL }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-lg text-white">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">
          Add Employee
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* NAME */}
          <input
            name="name"
            placeholder="Employee Name"
            className="w-full p-2 bg-slate-700 rounded"
            onChange={handleChange}
            required
          />

          {/* GENDER */}
          <select
            name="gender"
            className="w-full p-2 bg-slate-700 rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          {/* AGE */}
          <input
            name="age"
            type="number"
            placeholder="Age"
            className="w-full p-2 bg-slate-700 rounded"
            onChange={handleChange}
            required
          />

          {/* ADDRESS */}
          <textarea
            name="address"
            placeholder="Address"
            className="w-full p-2 bg-slate-700 rounded"
            onChange={handleChange}
            rows={2}
            required
          />

          {/* SALARY */}
          <input
            name="salary"
            type="number"
            placeholder="Salary"
            className="w-full p-2 bg-slate-700 rounded"
            onChange={handleChange}
            required
          />

          {/* PHOTO */}
          <div>
            <label className="text-sm text-gray-300">Photo</label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="w-full p-2 bg-slate-700 rounded"
              onChange={handleFileChange}
            />
          </div>

          {/* OFFER LETTER */}
          <div>
            <label className="text-sm text-gray-300">Offer Letter (PDF)</label>
            <input
              type="file"
              name="offerLetter"
              accept="application/pdf"
              className="w-full p-2 bg-slate-700 rounded"
              onChange={handleFileChange}
            />
          </div>

          {/* SALARY SLIP */}
          <div>
            <label className="text-sm text-gray-300">Salary Slip (PDF)</label>
            <input
              type="file"
              name="salarySlip"
              accept="application/pdf"
              className="w-full p-2 bg-slate-700 rounded"
              onChange={handleFileChange}
            />
          </div>

          {/* SIGNATURE */}
          <div>
            <label className="text-sm text-gray-300">Signature</label>
            <input
              type="file"
              name="signature"
              accept="image/*"
              className="w-full p-2 bg-slate-700 rounded"
              onChange={handleFileChange}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
