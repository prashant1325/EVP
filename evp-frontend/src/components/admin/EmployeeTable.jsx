const EmployeeTable = ({ employees }) => {
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
            <th className="p-3 text-left">Offer Letter</th>
            <th className="p-3 text-left">Salary Slip</th>
            <th className="p-3 text-left">Signature</th>
          </tr>
        </thead>

        <tbody className="bg-slate-800">
          {employees.map((emp, index) => (
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

              {/* SIGNATURE */}
              <td className="p-3">
                {emp.signature ? (
                  <img
                    src={emp.signature}
                    alt="Signature"
                    className="h-8 object-contain bg-white p-1 rounded"
                  />
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
