import { Types } from "../types";

const initialUser = {
    isLoggedIn: true,
    data: {},
    message: ""
} 

export function userReducer(userData = initialUser, action) {
    switch (action.type) {
      case Types.GET_USER:
        return userData;
      case Types.SET_USER_LOGGED_IN:
        let data = {...action.payload}
        return {
          data,
          isLoggedIn: data.token !== null ?  true : false,
          message: "",
          notify:false
        };
      case Types.SET_USER:
        return {
          data: action.payload.data,
          isLoggedIn: action.payload.data.token !== null ?  true : false,
          message: "Successfully logged in",
          notify:true
        };
      case Types.SET_USER_ERROR:
        return {
          ...userData,
          message: action.payload.message,
          notify:true
        };
      case Types.LOG_OUT:
        localStorage.removeItem('access_token')
        sessionStorage.removeItem('access_token')
        return {
          message: "",
          data: {},
          isLoggedIn: false,
          notify:false
        };
      default:
        return userData;
    }
  }

export function loaderReducer(isLoading = 0, action) {
    switch (action.type) {
      case Types.LOADING_ON:
        return ++isLoading;
      case Types.LOADING_OFF:
        return isLoading === 0 ? 0 : --isLoading;
      default:
        return isLoading;
    }
}


