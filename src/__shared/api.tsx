import axios from "axios";
import cookies from "./cookie";
export const baseURL = 'http://localhost:8000';
const API = axios.create({
  baseURL,
  responseType: "json",
});

API.interceptors.request.use(
  (config) => {
    const auth = cookies.get("auth");
    if (auth) {
      config.headers.Authorization = "Bearer " + auth;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
