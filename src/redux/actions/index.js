import { Types } from "../types";
import login from "../../api/login";
import history from "../../const/history"


export const getUserData = (exp) => async (dispatch) => {
    dispatch({ type: Types.LOADING_ON });
    let token = localStorage.getItem("access_token")
    let session_token = sessionStorage.getItem("access_token")

    if (token !== null || session_token !== null){
       login
          .get(`users/2`)
          .then((res) => {
            dispatch({
              type: Types.SET_USER_LOGGED_IN,
              payload: {...res.data.data},
            });
          })
          .catch((err) => {
            dispatch({
              type: Types.LOG_OUT,
            });
            history.push('/')
          })
          .finally(() => {
            dispatch({ type: Types.LOADING_OFF });
          });
    }
    else{
      dispatch({
        type: Types.LOG_OUT,
      });
      history.push('/')
      dispatch({ type: Types.LOADING_OFF });
    }
  };



export const logInUser = (e, p , remember) => async (dispatch) => {
    if (e.trim().length === 0 ||   p.trim().length === 0) {
      dispatch({
        type: Types.SET_USER_ERROR,
        payload: { message: "İstifadəçi adı və şifrə daxil edilməlidir" },
      });
    } else {
      dispatch({ type: Types.LOADING_ON });
      await login
        .post(`login` , {
          username:e , password:p
        })
        .then((res) => {
          {remember ? localStorage.setItem("access_token", res.data.token) :  sessionStorage.setItem("access_token", res.data.token);}
          dispatch(getUserData());
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


export const toggleLoading = (payload) => ({
    type: payload ? Types.LOADING_ON : Types.LOADING_OFF,
});



export const logOut = () => (dispatch) =>  {
    history.push('/')
    dispatch(
        {
            type: Types.LOG_OUT,
        }
    )
};