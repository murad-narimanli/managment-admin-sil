import { Types } from "../types";

const initialUser = {
    isLoggedIn: false,
    isRegistered: false,
    companyData: {},
};

const taskState = {
    loading: false,
    data:[]
  }

  const modalData = {
    modalOpen: false,
    editing:1,
    editingData:{}
}

export function modalReducer(modal= modalData, action) {
  switch (action.type) {
    case Types.SET_MODAL_ADD:
      return action.payload
    case Types.CLEAR_MODAL_ADD:
      return action.payload
    default:
      return modalData;
  }
}




  export function tasksReducer (tasks= taskState, action) {
    switch (action.type) {
      case Types.GET_TASKS_LOADING:
        return {
          loading: true,
          data:[]
        };
      case Types.GET_TASKS:
        return {
          loading: false,
          data:action.payload
        };
      default:
        return taskState;
    }
  }




export const userReducer = (user = initialUser, action) => {
    switch (action.type) {
        case Types.SET_COMPANY:
        case Types.LOG_OUT:
        case Types.GET_USER:
        case Types.SET_COMPANY_USERS:
            return { ...user, ...action.payload };
        case Types.SET_USER_ERROR:
            return { ...user, notify: true, message: action.payload.message };
        default:
            return user;
    }
};

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
