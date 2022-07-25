import { call, put, takeLatest } from 'redux-saga/effects'
import { commentService } from '../../../services/CommentService'
import { INSERT_COMMENT_SAGA, EDIT_COMMENT_SAGA, DELETE_COMMENT_SAGA } from '../../constants/CommentConstants'
import { notifiFunction } from '../../../util/Notification/notificationCyberbugs'
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { GET_TASK_DETAIL_SAGA } from '../../constants/TaskConstants'

function* insertCommentSaga(action) {
    try {
        const { status } = yield call(() => commentService.insertComment(action.comment));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.comment.taskId
            })
        }
    }
    catch (err) {
        notifiFunction('error', err.response.data)
    }

}
export function* theoDoiInsertCommentSaga() {
    yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}

function* updateCommentSaga(action) {
    try {
        const { status } = yield call(() => commentService.updateComment(action.id, action.contentComment));
        if (status == STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.taskId
            })
        }
    } catch (err) {
        notifiFunction('error', err.response.data)
    }
}

export function* theoDoiUpdateCommentsSaga() {
    yield takeLatest(EDIT_COMMENT_SAGA, updateCommentSaga)
}

function* deleteCommentSaga(action) {
    try {
        const { status } = yield call(() => commentService.deleteComment(action.idComment));
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.taskId
            })
        }
    } catch (err) {
        notifiFunction('error', err.response.data)
    }

}

export function* theoDoiDeleteComment() {
    yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}
