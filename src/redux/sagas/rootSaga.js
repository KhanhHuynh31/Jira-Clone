import { all } from "redux-saga/effects";
import * as Cyberbugs from '././Cyberbugs/UserCyberBugsSaga'
import * as ProjectCategorySaga from './Cyberbugs/ProjectCategorySaga';
import * as ProjectSaga from './Cyberbugs/ProjectSaga'
import * as TaskTypeSaga from './Cyberbugs/TaskTypeSaga';
import * as PrioritySaga from './Cyberbugs/PrioritySaga';
import * as TaskSaga from './Cyberbugs/TaskSaga';
import * as StatusSaga from './Cyberbugs/StatusSaga'
import * as CommentSaga from './Cyberbugs/CommentSaga'

import * as SignUpSaga from './Cyberbugs/SignUpSaga'

export function* rootSaga() {

  yield all([

    //Nghiệp vụ cyberbugs .... ,
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUserProject(),
    Cyberbugs.theoDoiRemoveUserProject(),
    Cyberbugs.theoDoiGetUserByProjectIdSaga(),
    ProjectCategorySaga.theoDoigetAllProjectCategory(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProject(),
    ProjectSaga.theoDoiGetProjectDetail(),
    ProjectSaga.theoDoiGetAllProjectSaga(),
    StatusSaga.theoDoiGetAllStatusSaga(),

    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    PrioritySaga.theoDoiGetAllPriority(),
    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateTaskStatusSaga(),
    TaskSaga.theoDoiHandleChangePostApi(),
    TaskSaga.theoDoiUdpateTask(),
    
    CommentSaga.theoDoiInsertCommentSaga(),
    CommentSaga.theoDoiUpdateCommentsSaga(),
    CommentSaga.theoDoiDeleteComment(),

    Cyberbugs.theoDoiGetAllUserSaga(),
    Cyberbugs.theoDoiDeleteUserFromListSaga(), 
    Cyberbugs.theoDoiEditUserInfoSaga(), 
    SignUpSaga.theoDoiUserSignUpSaga()

  ])


}