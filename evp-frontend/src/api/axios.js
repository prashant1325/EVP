import axios from "axios";

/*
  ✅ Uses ENV variable (Netlify / Local)
  ❌ No hardcoded localhost
*/
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    // 🚫 Do not attach token for login
    if (config.url?.includes("/login")) {
      return config;
    }

    // 🔐 Get tokens
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");

    // 🧠 Priority: admin > user
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
