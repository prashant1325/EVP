import { ShieldCheck } from "lucide-react";

const AdminFooter = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">

        {/* LEFT */}
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-yellow-400" />
          <span>Admin Panel – Employee Verification Portal</span>
        </div>

        {/* RIGHT */}
        <p>
          © {new Date().getFullYear()} EVP Admin. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default AdminFooter;
