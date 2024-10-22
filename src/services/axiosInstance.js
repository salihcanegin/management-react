import axios from "axios";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",  // Replace with your API's base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    
    // If the token exists, attach it to the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;