import { USLOGIN } from "../constants/CyberBugs";
import { USER_LOGIN } from "../../util/constants/settingSystem";
import { GET_USER_BY_PROJECT_ID, GET_ALL_USER_REDUCER, USER_EDIT_INFO_REDUCER } from "../constants/UserConstants";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: usLogin,
    userSearch: [],
    arrUser: [],
    arrAllUser: [],
    userEditInfo: {}
}

export const UserLoginCyberBugsReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case USLOGIN: {
            state.userLogin = action.userLogin;
            return { ...state }
        }
        case 'GET_USER_SEARCH': {
            state.userSearch = action.lstUserSearch;
            return { ...state }
        }
        case GET_USER_BY_PROJECT_ID: {
            state.arrUser = action.arrUser;
            return { ...state }
        }
        case GET_ALL_USER_REDUCER: {
            state.arrAllUser = action.arrAllUser;

            return { ...state }
        }

        case USER_EDIT_INFO_REDUCER: {
            state.userEditInfo = action.userEditInfo;

            return { ...state }
        }
        default: return { ...state };
    }
}