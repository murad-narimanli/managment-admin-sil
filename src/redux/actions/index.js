import { Types } from "../types";
import axiosPlugin from "../../api/axiosPlugin";
import history from "../../const/history";
import { message } from "antd";


// loginuserle birlikde chalıshır
export const getUserData = (id) => (dispatch) => {
    dispatch({ type: Types.LOADING_ON });
    let accessToken = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

    if (accessToken !== null) {
        axiosPlugin
            .get(`/users/${id}`)
            .then((res) => {
                dispatch({
                    type: Types.SET_USER_LOGGED_IN,

                    payload: { isLoggedIn: true, ...res.data.data },
                });
                message.success("Login Successful!");
                history.push("/tasks");
            })
            .catch((err) => {
                dispatch({
                    type: Types.SET_USER_LOGGED_IN,
                    payload: { isLoggedIn: false },
                });
                history.push("/");
            })
            .finally(() => {
                dispatch({ type: Types.LOADING_OFF });
            });
    } else {
        dispatch({
            type: Types.LOG_OUT,
        });
        history.push("/");
        dispatch({ type: Types.LOADING_OFF });
    }
};

export const logInUser = (u, p, remember) => async (dispatch) => {
    if (u.trim().length === 0 || p.trim().length === 0) {
        dispatch({
            type: Types.SET_USER_ERROR,
            payload: { message: "İstifadəçi adı və şifrə daxil edilməlidir" },
        });
    } else {
        dispatch({ type: Types.LOADING_ON });
        await axiosPlugin
            .get("/users")
            .then((res) => {
                const user = res.data.find((userData) => userData.username === u && userData.password === p);
                {
                    remember ? localStorage.setItem("access_token", user.id) : sessionStorage.setItem("access_token", user.id);
                }
                dispatch(getUserData(user.id));
            })
            .catch((error) => {
                dispatch({
                    type: Types.SET_USER_ERROR,
                    payload: { message: "İstifadəçi adı və ya şifrə yanlışdır" },
                });
            })
            .finally(() => {
                dispatch({ type: Types.LOADING_OFF });
            });
    }
};

export const registerAction = (values) => (dispatch) => {
    let id = parseInt(Number(Math.random() * Date.now()));
    axiosPlugin
        .post("/users", {
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
            console.log(res, "user registered");
            localStorage.setItem("access_token", res.data.id);
            dispatch({
                type: Types.ADMIN_REGISTERED,
                payload: {
                    isRegistered: true,
                },
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export const logOut = () => (dispatch) => {
    localStorage.removeItem("access_token");
    history.push("/");
    dispatch({
        type: Types.LOG_OUT,
        payload: {
            isLoggedIn: false,
            isRegistered: false,
        },
    });
};



export const toggleLoading = (payload) => ({
    type: payload ? Types.LOADING_ON : Types.LOADING_OFF,
});
