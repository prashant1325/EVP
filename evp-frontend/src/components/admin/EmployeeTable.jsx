import React, { useMemo } from "react";

const EmployeeTable = ({ employees }) => {
  // Generate EVP score between 300–900
  const generateEVPScore = () => {
    return Math.floor(Math.random() * (900 - 300 + 1)) + 300;
  };

  // Ensure EVP score stays stable per employee
  const employeesWithScore = useMemo(() => {
    return employees?.map((emp) => ({
      ...emp,
      evpScore: emp.evpScore ?? generateEVPScore(),
    }));
  }, [employees]);

  // If no employees yet
  if (!employees || employees.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-400">
        No employees added yet
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="w-full border border-slate-700 rounded-lg overflow-hidden text-sm">
        <thead className="bg-slate-700 text-white">
          <tr>
            <th className="p-3 text-left">Photo</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Gender</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Salary</th>
            <th className="p-3 text-left">EVP Score</th>
            <th className="p-3 text-left">Offer Letter</th>
            <th className="p-3 text-left">Salary Slip</th>
          </tr>
        </thead>

        <tbody className="bg-slate-800">
          {employeesWithScore.map((emp, index) => (
            <tr
              key={index}
              className="border-t border-slate-700 hover:bg-slate-700/50 transition"
            >
              {/* PHOTO */}
              <td className="p-3">
                {emp.photo ? (
                  <img
                    src={emp.photo}
                    alt="Employee"
                    className="h-10 w-10 rounded-full object-cover border border-slate-600"
                  />
                ) : (
                  "-"
                )}
              </td>

              {/* NAME */}
              <td className="p-3 font-medium">{emp.name || "-"}</td>

              {/* GENDER */}
              <td className="p-3">{emp.gender || "-"}</td>

              {/* AGE */}
              <td className="p-3">{emp.age || "-"}</td>

              {/* ADDRESS */}
              <td className="p-3 max-w-xs truncate" title={emp.address}>
                {emp.address || "-"}
              </td>

              {/* SALARY */}
              <td className="p-3">
                {emp.salary ? `₹ ${emp.salary}` : "-"}
              </td>

              {/* EVP SCORE */}
              <td className="p-3 font-bold text-yellow-400">
                {emp.evpScore}
              </td>

              {/* OFFER LETTER */}
              <td className="p-3">
                {emp.offerLetter ? (
                  <a
                    href={emp.offerLetter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 underline"
                  >
                    View
                  </a>
                ) : (
                  "-"
                )}
              </td>

              {/* SALARY SLIP */}
              <td className="p-3">
                {emp.salarySlip ? (
                  <a
                    href={emp.salarySlip}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 underline"
                  >
                    View
                  </a>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
