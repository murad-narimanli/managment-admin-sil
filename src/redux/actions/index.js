import { Types } from "../types";
import axiosPlugin from "../../api/axiosPlugin";
import { notification } from "antd";

export const registerAdmin = (values) => async (dispatch) => {
    let id = parseInt(Number(Math.random() * Date.now()));
    try {
        const allUsers = await axiosPlugin.get("/companies");
        const emailExists = allUsers.data.some((user) => user.email === values.email);
        if (emailExists) {
            notification.error({
                message: "Registration Error",
                description: "This email is already in use.",
            });
            return;
        }
    } catch (error) {
        console.error("Error while checking email existence:", error);
        return;
    }
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
            // localStorage.setItem("access_token", res.data.id);
            notification.open({
                type: "success",
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




export const setVisibleAddModal = (modalOpen, editing=null , editingData = {}) => async (dispatch) => {
    console.log('setVisibleAddModal')
    if (modalOpen){
        await  dispatch({
        type: Types.SET_MODAL_ADD,
        payload: {
          modalOpen,
          editing,
          editingData
        }
      });
    }
    else{
      dispatch({
        type: Types.CLEAR_MODAL_ADD,
          payload: {
              modalOpen,
              editing:null,
              editingData:{}
        }
      });
    }
};



export const getTasks = (companyId) => async (dispatch) => {
    dispatch({
      type: Types.GET_TASKS_LOADING,
    });
    await axiosPlugin
        .get(`tasks` , {
            params: {
                companyId,
            },
        })
        .then((res) => {
          dispatch({
            type: Types.GET_TASKS,
            payload: {
              data: res.data,
              loading:false
            }
          });
        }).catch(() => {
            dispatch({
              type: Types.GET_TASKS,
              payload: {
                data: [],
                loading:false
              }
           });
       })
  };
  