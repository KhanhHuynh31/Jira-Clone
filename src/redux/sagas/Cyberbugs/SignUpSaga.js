import { call, delay, put, takeLatest } from "redux-saga/effects";
import { signUpService } from "../../../services/SignUpService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import {history} from '../../../util/history';
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import { CLOSE_DRAWER } from "../../constants/CyberBugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { CREATE_A_USER, GET_ALL_USERS_SAGA, USER_SIGN_UP_SAGA} from "../../constants/UserConstants";

function* userSignUpSaga(action) {
    //HIỂN THỊ LOADING 
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500)
    try {
        //Gọi api lấy dữ liệu về
        const { status } = yield call(() => signUpService.signUp(action.signUpData));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            notifiFunction('success', 'User SignUp', 'SignUp Successfully !!')
            if(action.actionTyp3e === CREATE_A_USER) {
                yield put({
                    type: CLOSE_DRAWER
                })
                yield put({
                    type: GET_ALL_USERS_SAGA, 
                    keyword: ''
                })
            } else {
                history.push("/logincyberbugs");
            }
           
  

        }
    } catch (error) {
        alert(error.response.data.message);
        yield put({
            type: HIDE_LOADING
        })
    }
}


export function* theoDoiUserSignUpSaga() {
    yield takeLatest(USER_SIGN_UP_SAGA, userSignUpSaga);
}