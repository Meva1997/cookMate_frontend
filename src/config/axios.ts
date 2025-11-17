import axios, { type InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("cookMate_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Interceptor: adds Authorization if there is a token in localStorage
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window === "undefined") return config;
  config.headers = config.headers || {};
  const token = localStorage.getItem("cookMate_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper to save/remove token and set default header immediately
export const setAuthToken = (token?: string) => {
  if (typeof window === "undefined") return;
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("cookMate_token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("cookMate_token");
  }
};

export default api;
