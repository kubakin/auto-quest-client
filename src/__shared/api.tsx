import axios, { AxiosError } from 'axios';
import cookies from "./cookie";
import { message } from 'antd';
export const baseURL = process.env.REACT_APP_BASE_URL;
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
  (error) => {
      return Promise.reject(error)
  }
);

API.interceptors.response.use(
    (config) => {
        return config;

    },
    async (error:AxiosError) => {
        console.log(error.response?.status)
        if (error.response?.status !== 401) {
            message.error(error?.response?.data.message)
        }
        return Promise.reject(error)
    }
)

export default API;
