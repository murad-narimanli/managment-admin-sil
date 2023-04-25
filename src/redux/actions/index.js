import { Types } from "../types";
import axiosPlugin from "../../api/axiosPlugin";
import {notification } from "antd";


export const registerAdmin = (values) => (dispatch) => {
    let id = parseInt(Number(Math.random() * Date.now()));
    axiosPlugin
        .post("/companies", {
            id,
            ...values,
            isCompany: true,
            companyId: id,
            role: {
                admin: true,
                editTask: true,
                addTask: true,
                deleteTask: true,
                changeStatus: true,
                changeSettings: true,
            },
        })
        .then((res) => {
            console.log(res, " admin registered ");
            localStorage.setItem("access_token", res.data.id);
            notification.open({
                message: "Congratulations,your account has been successfully created",
                description: `User name: ${res.data.username}`,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getCompany = (id) => async (dispatch) => {
    if (!id) {
        id = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    }
    if (!id) {
        console.error("No users!");
        return;
    }
    dispatch({ type: Types.LOADING_ON });
    axiosPlugin
        .get(`/companies/${id}`)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: Types.SET_COMPANY,
                payload: {
                    isLoggedIn: typeof res.data.id === "number" ? res.data.id : false,
                    companyData: res.data,
                },
            });
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            dispatch({ type: Types.LOADING_OFF });
        });
};

export const logIn = (u, p, remember) => async (dispatch) => {
    if (u.trim().length === 0 || p.trim().length === 0) {
        dispatch({
            type: Types.SET_USER_ERROR,
            payload: { message: "İstifadəçi adı və şifrə daxil edilməlidir", notify: true },
        });
    } else {
        dispatch({ type: Types.LOADING_ON });
        await axiosPlugin
            .get("/companies")
            .then((res) => {
                const user = res.data.find((userData) => userData.username === u && userData.password === p);

                remember ? localStorage.setItem("access_token", user.id) : sessionStorage.setItem("access_token", user.id);

                dispatch(getCompany(user.id));
            })
            .catch((error) => {
                dispatch({
                    type: Types.SET_USER_ERROR,
                    payload: { message: "İstifadəçi adı və ya şifrə yanlışdır", notify: true },
                });
            })
            .finally(() => {
                dispatch({ type: Types.LOADING_OFF });
            });
    }
};

export const createUser = (values) => (dispatch) => {
    console.log("data objesi: ", values);
    return axiosPlugin.post("/companies", {
        name: values.name,
        surname: values.surname,
        username: values.username,
        email: values.email,
        password: values.password,
        isCompany: false,
        companyId: values.companyId,
        companyName: values.companyName,
        role: {
            admin: false,
            editTask: values.editTask,
            addTask: values.addTask,
            deleteTask: values.deleteTask,
            changeStatus: values.changeStatus,
            changeSettings: values.changeSettings,
        },
    });
};

export const logOut = () => (dispatch) => {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
    dispatch({
        type: Types.LOG_OUT,
        payload: {
            isLoggedIn: false,
            isRegistered: false,
            companyData: {},
        },
    });
};
