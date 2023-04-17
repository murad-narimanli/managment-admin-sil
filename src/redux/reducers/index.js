import { Types } from "../types";

const initialUser = {
    isLoggedIn: false,
    isRegistered: false,
    companyData: {},
    companyUsersData: [],
};

export const userReducer = (user = initialUser, action) => {
    switch (action.type) {
        case Types.SET_COMPANY:
        case Types.LOG_OUT:
        case Types.GET_USER:
        case Types.SET_COMPANY_USERS:
            return {...user,...action.payload};
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
