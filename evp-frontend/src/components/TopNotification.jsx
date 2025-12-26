import { X } from "lucide-react";

const TopNotification = ({ message, type = "success", onClose }) => {
  if (!message) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 z-50 -translate-x-1/2
        px-6 py-3 rounded-lg shadow-lg flex items-center gap-3
        text-sm font-medium transition-all
        ${type === "success"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"}`}
    >
      <span>{message}</span>
      <button onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  );
};

export default TopNotification;
