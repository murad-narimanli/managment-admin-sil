import axios from "axios";
import { apiUrl } from "./constants";

export const axiosPlugin = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosPlugin.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = localStorage.getItem("access_token") ? "Bearer " + localStorage.getItem("access_token") : null;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosPlugin;
