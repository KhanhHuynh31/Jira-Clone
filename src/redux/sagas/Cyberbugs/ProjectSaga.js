import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberBugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from "../../constants/ProjectCyberbugsConstants";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../constants/UserConstants";
import { history } from '../../../util/history';
import { projectService } from "../../../services/ProjectService";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
function* createProjectSaga(action) {

    //HIỂN THỊ LOADING
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {

        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => cyberbugsService.createProjectAuthorization(action.newProject));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            history.push('/projectmanagement');
        }


    } catch (err) {
        console.log(err);
    }

    yield put({
        type: HIDE_LOADING
    })
}





export function* theoDoiCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);
}




//Saga dùng để get all project từ api 
//Khải - Code ngày dd/MM/yyyy

function* getListProjectSaga(action) {

    try {
        const { data, status } = yield call(() => cyberbugsService.getListProject());

        //Sau khi lấy dữ liệu từ api về thành công
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: 'GET_LIST_PROJECT',
                projectList: data.content
            })
        }
    } catch (err) {
        console.log(err)
    }

}


export function* theoDoiGetListProjectSaga() {
    yield takeLatest('GET_LIST_PROJECT_SAGA', getListProjectSaga);
}

//UpdateProject
function* updateProjectSaga(action) {
    console.log('UPDATE_PROJECT',action);
    // return;
    //HIỂN THỊ LOADING
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {


        const { data, status } = yield call(() => cyberbugsService.updateProject(action.projectUpdate));
        if (status === STATUS_CODE.SUCCESS) {

        }

        yield call(getListProjectSaga);
        yield put({
            type: 'CLOSE_DRAWER'
        })
    } catch (err) {
        console.log(err);
    }

    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiUpdateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga);
}
//DeleteProject
function* deleteProjectSaga(action) {

    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {
        const { data, status } = yield call(() => projectService.deleteProject(action.idProject));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            notifiFunction('success', 'Delete project successfully !')

            // history.push('/projectmanagement');
        } else {
            notifiFunction('error', 'Delete project fail !')
        }
        // yield put({
        //     type:'GET_LIST_PROJECT_SAGA'
        // })
        yield call(getListProjectSaga);
        yield put({
            type: 'CLOSE_DRAWER'
        })
    } catch (err) {
        notifiFunction('error', 'Delete project fail !')
        console.log(err);
    }

    yield put({
        type: HIDE_LOADING
    })
}


export function* theoDoiDeleteProject() {
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectSaga);
}
//Get Project
function* getProjectDetailSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId));

        console.log('data', data);
        yield put({
            type: 'PUT_PROJECT_DETAIL',
            projectDetail: data.content
        })

    } catch (err) {
        history.push('/projectmanagement');
    }

}

export function* theoDoiGetProjectDetail() {
    yield takeLatest('GET_PROJECT_DETAIL', getProjectDetailSaga);
}
//Get All Project
function* getProjectAllSaga(action) {
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay(500);

    try {
        const { data, status } = yield call(() => projectService.getAllProject());

        yield put({
            type: GET_ALL_PROJECT,
            arrProject: data.content
        })
        yield put({
            type: GET_USER_BY_PROJECT_ID_SAGA,
            idProject: data.content[0].id
        })
    } catch (err) {
        history.push('/projectmanagement');
    }

    yield put({
        type: HIDE_LOADING
    })
}

export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga);
}