import { useEffect, useState, useMemo } from "react";
import AddEmployeeForm from "../components/admin/AddEmployeeForm";
import EmployeeTable from "../components/admin/EmployeeTable";
import AdminNavbar from "../components/admin/AdminNavbar";
import { FiPlus, FiUsers, FiActivity, FiTrendingUp } from "react-icons/fi";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);

  /* ================= EVP SCORE GENERATOR ================= */
  const generateEVPScore = () => {
    return Math.floor(Math.random() * (900 - 300 + 1)) + 300;
  };

  useEffect(() => {
    const root = document.getElementById("root");
    if (root) root.style.paddingTop = "0px";
    return () => {
      if (root) root.style.paddingTop = "";
    };
  }, []);

  /* ================= ADD EMPLOYEE WITH EVP ================= */
  const handleAddEmployee = (employee) => {
    const employeeWithEVP = {
      ...employee,
      evpScore: generateEVPScore(),
    };

    setEmployees((prev) => [...prev, employeeWithEVP]);
    setOpen(false);
  };

  /* ================= EVP STATS ================= */
  const averageEVP = useMemo(() => {
    if (employees.length === 0) return 0;
    const total = employees.reduce((sum, emp) => sum + emp.evpScore, 0);
    return Math.round(total / employees.length);
  }, [employees]);

  return (
    <div className="min-h-screen bg-[#020c1b] text-white">
      <AdminNavbar />

      <div className="max-w-[1600px] mx-auto px-6 py-10">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">
              Admin <span className="text-yellow-400">Dashboard</span>
            </h1>
            <p className="text-slate-400 flex items-center gap-2">
              <FiActivity className="text-yellow-400" />
              Manage your organization's employee verification database.
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="group flex items-center gap-2 bg-yellow-400 text-[#020c1b] px-6 py-3 rounded-xl font-bold hover:bg-white hover:scale-105 transition-all shadow-lg shadow-yellow-400/10"
          >
            <FiPlus className="stroke-[3px]" />
            Add New Employee
          </button>
        </div>

        {/* ================= QUICK STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#112240] p-6 rounded-2xl border border-white/5">
            <p className="text-slate-400 text-sm font-semibold uppercase mb-1">
              Total Employees
            </p>
            <h3 className="text-3xl font-bold">{employees.length}</h3>
          </div>

          <div className="bg-[#112240] p-6 rounded-2xl border border-white/5">
            <p className="text-slate-400 text-sm font-semibold uppercase mb-1">
              Pending Verifications
            </p>
            <h3 className="text-3xl font-bold text-yellow-400">0</h3>
          </div>

          
        </div>

        {/* ================= EMPLOYEE TABLE ================= */}
        <div className="bg-[#112240]/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10 flex items-center gap-2">
            <FiUsers className="text-yellow-400" />
            <h2 className="font-bold text-lg">Employee Directory</h2>
          </div>

          <div className="p-6 overflow-x-auto">
            {employees.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-slate-500 italic">
                  No employee data found. Start by adding a new record.
                </p>
              </div>
            ) : (
              <EmployeeTable employees={employees} />
            )}
          </div>
        </div>

        {/* ================= MODAL ================= */}
        {open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-[#020c1b]/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <div className="relative z-10 w-full max-w-2xl bg-[#112240] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              <AddEmployeeForm
                onClose={() => setOpen(false)}
                onSave={handleAddEmployee}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
