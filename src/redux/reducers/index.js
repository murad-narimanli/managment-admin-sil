import { Types } from "../types";

const initialUser = {
    isLoggedIn: true,
    data: {},
    isRegistered: false,

} 

export function userReducer(userData = initialUser, action) {
    switch (action.type) {
      case Types.GET_USER:
        return userData;
      case Types.SET_USER_LOGGED_IN:
        let data = {...action.payload}
        return {
          data,
          isLoggedIn: data.id !== null,
          message: "",
          notify:false
        };
      case Types.SET_USER_ERROR:
        return {
          ...userData,
          message: action.payload.message,
          notify:true
        };
      case Types.LOG_OUT:
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


