import axios from "axios";

/*
  ✅ Connected to LIVE backend
  ❌ No localhost
*/
const api = axios.create({
  baseURL: "https://backend-evp.vercel.app", // ✅ BACKEND LINK ADDED
  withCredentials: true,
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    // 🚫 Do not attach token for login
    if (config.url?.includes("/login")) {
      return config;
    }

    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");

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
