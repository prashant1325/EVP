import { createContext, useEffect, useState } from "react";
import api from "../api/axios"; // ✅ uses interceptor

// ✅ Safe default
export const AuthContext = createContext({
  user: null,
  loading: true,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= CHECK USER LOGIN ON LOAD ================= */
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("userToken");

      // ❌ No token → user not logged in
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // ✅ CORRECT USER PROFILE ROUTE
        const res = await api.get("/api/user/me");

        // 🔥 Backend returns user directly
        setUser(res.data);
      } catch (err) {
        // ❌ Invalid / expired token
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  /* ================= LOGOUT USER ================= */
  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
