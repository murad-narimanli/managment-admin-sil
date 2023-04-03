import axios from "axios";
import { loginUrl } from "./constants";

export const login = axios.create({
    baseURL: `${loginUrl}api/`,
    headers: {
        "Content-Type": "application/json",
    },
});

login.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = localStorage.getItem("access_token") ? "Bearer " + localStorage.getItem("access_token") : null;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default login;
