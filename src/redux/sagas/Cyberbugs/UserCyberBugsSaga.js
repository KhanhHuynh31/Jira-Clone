import { call, delay, takeLatest, put } from 'redux-saga/effects';
import { cyberbugsService } from '../../../services/CyberBugsService';
import { USER_SIGNIN_API, USLOGIN } from '../../constants/CyberBugs';
import { DISPLAY_LOADING, HIDE_LOADING } from '../../constants/LoadingConst';
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem'
import { history } from '../../../util/history';
import { userService } from '../../../services/UserService';
import { CLOSE_DRAWER } from "../../constants/CyberBugs";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";

import { GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA,  DELETE_USER_FROM_LIST_SAGA, EDIT_USER_INFO_SAGA, GET_ALL_USERS_SAGA, GET_ALL_USER_REDUCER } from '../../constants/UserConstants';

//Quản lý các action saga

function* signinSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    //Gọi api 
    try {
        const { data, status } = yield call(() => cyberbugsService.signinCyberBugs(action.userLogin));

        //Lưu vào localstorage khi đăng nhập thành công
        localStorage.setItem(TOKEN, data.content.accessToken);
        localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
        yield put({
            type: USLOGIN,
            userLogin: data.content
        })
        history.push('/projectmanagement');

    } catch (error) {
        alert(error.response.data.message);
    }


    yield put({
        type: HIDE_LOADING
    })

}


export function* theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}
//search
function* getUserSaga(action) {

    //action.keyWord

    //Gọi api 
    try {
        const { data, status } = yield call(() => userService.getUser(action.keyWord));

        yield put({
            type: 'GET_USER_SEARCH',
            lstUserSearch: data.content
        })

    } catch (err) {
        console.log(err.response.data)
    }
}



export function* theoDoiGetUser() {
    yield takeLatest("GET_USER_API", getUserSaga);
}
//add member
function* addUserProjectSaga(action) {


    try {
        const { data, status } = yield call(() => userService.assignUserProject(action.userProject));

        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })

    } catch (err) {
        console.log(err.response.data)
    }
}



export function* theoDoiAddUserProject() {
    yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}
//Remove User Project
function* removeUserProjectSaga(action) {


    try {
        const { data, status } = yield call(() => userService.deleteUserFromProject(action.userProject));

        yield put({
            type: 'GET_LIST_PROJECT_SAGA'
        })

    } catch (err) {
        console.log(err.response.data)
    }
}



export function* theoDoiRemoveUserProject() {
    yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}
function* getUserByProjectIdSaga(action) {
    const { idProject } = action;

    try {
        const { data, status } = yield call(() => userService.getUserByProjectId(idProject));
        console.log('checkdata', data);

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: data.content
            })
        }

    } catch (err) {
        console.log(err.response.data);
        if (err.response.data.STATUS_CODE === STATUS_CODE.NOT_FOUND) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: []
            })
        }
    }
}



export function* theoDoiGetUserByProjectIdSaga() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga)
}
//Management USer

function* getAllUserSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try {
        const { data, status } = yield call(() => userService.getUser(action.keyword));

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USER_REDUCER,
                arrAllUser: data.content
            })
        }
    } catch (error) {
        console.log(error.response.data);
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiGetAllUserSaga() {
    yield takeLatest(GET_ALL_USERS_SAGA, getAllUserSaga)
}



function* deleteUserFromListSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(600)
    try {
        const { data, status } = yield call(() => userService.deleteUserById(action.userId));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USERS_SAGA,
                keyword: ''
            })
            notifiFunction("success", "Delete User", "Delete User From List Successfully !!! ")
        }
    } catch (error) {
        notifiFunction("warning", "Delete User", "Delete User From List Failed !!! ")
        console.log(error.response.data);
    }
    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiDeleteUserFromListSaga() {
    yield takeLatest(DELETE_USER_FROM_LIST_SAGA, deleteUserFromListSaga)
}


function* editUserInfoSaga(action) {

    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(600)
    try {
        const { data, status } = yield call(() => userService.editUserInfo(action.userInfo));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_USERS_SAGA,
                keyword: ''
            })
            notifiFunction("success", "Edit User", "Edit User Info Successfully !!! ")
        }
    } catch (error) {
        notifiFunction("warning", "Edit User", "Edit User Info List Failed !!! ")
        console.log(error.response.data);
    }
    yield put({
        type: CLOSE_DRAWER
    })

    yield put({
        type: HIDE_LOADING
    })

}
export function* theoDoiEditUserInfoSaga() {
    yield takeLatest(EDIT_USER_INFO_SAGA, editUserInfoSaga)
}


