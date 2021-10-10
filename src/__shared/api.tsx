import axios from "axios";
import cookies from "./cookie";
const API = axios.create({
  baseURL: "https://moody-dragonfly-33.loca.lt",
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
