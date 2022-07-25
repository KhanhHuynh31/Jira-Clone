import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/StatusConstant';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/PriorityConstants';
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA } from '../../../redux/constants/TaskConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/TaskTypeConstants';
import { INSERT_COMMENT_SAGA, GET_TASK_COMMENT_SAGA, EDIT_COMMENT_SAGA, DELETE_COMMENT_SAGA } from '../../../redux/constants/CommentConstants'
import { Popconfirm } from 'antd';

import { Editor } from '@tinymce/tinymce-react'

import { Select } from 'antd';

export default function ModalCyberBugs(props) {

    const { taskDetailModal } = useSelector(state => state.TaskReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { projectDetail } = useSelector(state => state.ProjectReducer)

    const [visibleEditor, setVisibleEditor] = useState(false);
    const [visibleComment, setVisibleComment] = useState(false);
    const [idComment, setIdComment] = useState('');

    const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
    const [content, setContent] = useState(taskDetailModal.description);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_ALL_STATUS_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    }, [])

    const renderListComment = () => {
        return taskDetailModal.lstComment.map((item, index) => {
            return <div className="comment-item mb-3" key={index}>
                <div className="display-comment" style={{ display: 'flex' }}>
                    <div className="avatar">
                        <img src={item.avatar} alt={item.avatar} />
                    </div>
                    <div>
                        <p style={{ marginBottom: 5 }}>
                            {item.name}
                        </p>
                        <div style={{ marginBottom: 5 }}>
                            {idComment === item.id ? <div>
                                <Editor
                                    name="commentList"
                                    initialValue={item.commentContent}
                                    init={{
                                        selector: 'textarea#myTextArea',
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar:
                                            'undo redo | formatselect | bold italic backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | removeformat | help'
                                    }}
                                    onEditorChange={(content, editor) => {
                                        setComment(content);


                                    }}
                                />
                                <button className="btn btn-primary m-2" onClick={() => {
                                    dispatch({
                                        type: EDIT_COMMENT_SAGA,
                                        id: item.id,
                                        contentComment: comment,
                                        taskId: taskDetailModal.taskId
                                    })
                                    setIdComment('')
                                }}>Save</button>
                                <button className="btn btn-primary m-2" onClick={() => {
                                    setIdComment('')
                                }}>Close</button>
                            </div> : <div>{ReactHtmlParser(item.commentContent)}</div>}

                        </div>
                        <div>
                            <span style={{ color: '#929398', cursor: 'pointer' }} onClick={() => {
                                setIdComment(item.id)
                            }}>Edit </span>
                            •
                            <span style={{ color: '#929398', cursor: 'pointer' }}>
                                <Popconfirm
                                    title="Are you sure to delete this comment?"
                                    onConfirm={() => {
                                        dispatch({
                                            type: DELETE_COMMENT_SAGA,
                                            idComment: item.id,
                                            taskId: taskDetailModal.taskId
                                        })
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    Delete
                                </Popconfirm>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        })
    }
    const renderComment = () => {
        return <div>
            {
                visibleComment ? <div>
                    <Editor
                        name="commentBox"
                        init={{
                            selector: 'textarea#myTextArea',
                            placeholder: 'Add comment',
                            height: 200,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                        }}
                        onEditorChange={(content, editor) => {
                            setComment(content)
                        }}
                    />
                    <button className="btn btn-primary m-2" onClick={() => {
                        dispatch({
                            type: INSERT_COMMENT_SAGA,
                            comment: {
                                "taskId": taskDetailModal.taskId,
                                "contentComment": comment,
                            },
                        })
                        setVisibleComment(false);
                    }}>Save</button>
                    <button className="btn btn-primary m-2" onClick={() => {
                        setVisibleComment(false)
                    }}>Close</button>
                </div> : <div onClick={() => {
                    setVisibleComment(!visibleComment);
                }}><u style={{ cursor: 'pointer' }}>Comment...</u></div>}


        </div>
    }

    const renderDescription = () => {
        const jsxDescription = ReactHtmlParser(taskDetailModal.description);
        return <div>
            {visibleEditor ? <div> <Editor
                name="description"
                initialValue={taskDetailModal.description}
                init={{
                    selector: 'textarea#myTextArea',
                    height: 300,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={(content, editor) => {
                    setContent(content);
                }}
            />

                <button className="btn btn-primary m-2" onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: content
                    })

                    setVisibleEditor(false);
                }}>Save</button>
                <button className="btn btn-primary m-2" onClick={() => {
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: historyContent
                    })

                    setVisibleEditor(false)
                }}>Close</button>
            </div> : <div onClick={() => {

                setHistoryContent(taskDetailModal.description);
                setVisibleEditor(!visibleEditor);

            }}>{jsxDescription}</div>}


        </div>
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        dispatch({
            type: HANDLE_CHANGE_POST_API_SAGA,
            actionType: CHANGE_TASK_MODAL,
            name,
            value
        })
    }
    const renderTimeTracking = () => {

        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round(Number(timeTrackingSpent) / max * 100)

        return <div>
            <div style={{ display: 'flex' }}>
                <i className="fa fa-clock" />
                <div style={{ width: '100%' }}>

                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{Number(timeTrackingRemaining)}h logged</p>
                        <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                    </div>
                </div>


            </div>
            <div className="row">
                <div className="col-6">
                    <input className="form-control" name="timeTrackingSpent" onChange={handleChange} />
                </div>
                <div className="col-6">
                    <input className="form-control" name="timeTrackingRemaining" onChange={handleChange} />
                </div>
            </div>
        </div>
    }

    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">

            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="task-title">
                            <i className="fa fa-bookmark pr-1" />
                            <select name="typeId" value={taskDetailModal.typeId} onChange={handleChange}>
                                {arrTaskType.map((tp, index) => {
                                    return <option value={tp.id} key={index}>{tp.taskType}</option>
                                })}
                            </select>
                            <span>{taskDetailModal.taskName}</span>
                            <span>{taskDetailModal.taskId}</span>

                        </div>
                        <div style={{ display: 'flex' }} className="task-click">
                            <i className="fa fa-trash-alt='xyz'" style={{ cursor: 'pointer' }} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <p className="issue">This is an issue of type: {taskDetailModal.taskName}</p>
                                    <div className="description">
                                        <p>Description</p>
                                        {renderDescription()}
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={require("../../../assets/img/download (1).jfif")} alt='xyz' />
                                            </div>
                                            <div className="input-comment mb-4">
                                                {renderComment()}
                                            </div>
                                        </div>
                                        <div className="lastest-comment mt-3">
                                            {renderListComment()}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select name="statusId" className="custom-select" value={taskDetailModal.statusId} onChange={(e) => {

                                            handleChange(e)
                                        }}>
                                            {arrStatus.map((status, index) => {
                                                return <option value={status.statusId} key={index}>{status.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className="row">
                                            {
                                                taskDetailModal.assigness.map((user, index) => {
                                                    return <div className="col-6  mt-1 mb-1" key={index}>
                                                        <div style={{ display: 'flex' }} className="item mr-0">


                                                            <div className="avatar">
                                                                <img src={user.avatar} alt={user.avatar} />
                                                            </div>
                                                            <p className="name mt-1 ml-1">
                                                                {user.name}
                                                                <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {
                                                                    dispatch({
                                                                        type: HANDLE_CHANGE_POST_API_SAGA,
                                                                        actionType: REMOVE_USER_ASSIGN,
                                                                        userId: user.id
                                                                    })
                                                                }} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                })
                                            }

                                            <div className="col-6  mt-1 mb-1">
                                                <Select
                                                    options={projectDetail.members && projectDetail.members.filter(mem => {
                                                        let index = taskDetailModal.assigness.findIndex(us => us.id === mem.userId);
                                                        if (index !== -1) {
                                                            return false;
                                                        }
                                                        return true;
                                                    }).map((mem, index) => {
                                                        return { value: mem.userId, label: mem.name };
                                                    })}
                                                    optionFilterProp="label"
                                                    style={{ width: '100%' }}
                                                    name="lstUser"
                                                    value="+ Add more"
                                                    className="form-control"
                                                    onSelect={(value) => {
                                                        if (value == '0') {
                                                            return;
                                                        }
                                                        let userSelected = projectDetail.members.find(mem => mem.userId == value);
                                                        userSelected = { ...userSelected, id: userSelected.userId };
                                                        //dispatchReducer
                                                        dispatch({
                                                            type: HANDLE_CHANGE_POST_API_SAGA,
                                                            actionType: CHANGE_ASSIGNESS,
                                                            userSelected
                                                        })
                                                    }}>


                                                </Select>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select name="priorityId" className="form-control" value={taskDetailModal.priorityId} onChange={(e) => {
                                            handleChange(e);
                                        }}>
                                            {arrPriority.map((item, index) => {
                                                return <option key={index} value={item.priorityId}>{item.priority}</option>
                                            })}


                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input name="originalEstimate" type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={(e) => {
                                            handleChange(e);
                                        }} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        {
                                            renderTimeTracking()
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}