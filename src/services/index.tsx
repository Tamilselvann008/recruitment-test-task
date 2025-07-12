import axios from "axios";

// need to use this in env
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://reqres.in/api";
const API_KEY = process.env.REACT_APP_API_KEY || "your_api_key_here";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    window.location.href = "/login";
  }
  config.headers["x-api-key"] = API_KEY; // Add API key to headers
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const axiosInstanceWithoutToken = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

export default axiosInstance;
