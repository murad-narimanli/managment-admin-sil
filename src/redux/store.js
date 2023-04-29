import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { loaderReducer } from "./reducers";
import { userReducer, tasksReducer,modalReducer } from "./reducers/index";

const rootReducer = combineReducers({
    isLoading: loaderReducer,
    user: userReducer,
    tasks: tasksReducer,
    modalData: modalReducer,

});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;