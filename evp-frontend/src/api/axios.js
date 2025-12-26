import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // 🚫 Do not attach token for login
    if (config.url.includes("/login")) {
      return config;
    }

    // 🔐 Get tokens
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken"); // ✅ USER TOKEN

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
