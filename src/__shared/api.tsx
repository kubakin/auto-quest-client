import axios from "axios";
import cookies from "./cookie";
export const baseURL = process.env.BASE_URL || 'https://lit-taiga-15524.herokuapp.com';
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
