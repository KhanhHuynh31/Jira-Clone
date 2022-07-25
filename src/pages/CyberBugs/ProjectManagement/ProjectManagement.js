import React, { useState, useEffect, useRef } from 'react'
import { Table, Tag, Button, Avatar, Popconfirm,  Popover, AutoComplete } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import FormEditProject from '../../../components/Forms/FormEditProject/FormEditProject';
import { NavLink } from 'react-router-dom';

export default function ProjectManagement(props) {
    //Lấy dữ liệu từ reducer về component
    const projectList = useSelector(state => state.ProjectCyberBugsReducer.projectList);
    const { userSearch } = useSelector(state => state.UserLoginCyberBugsReducer)
    const [value, setValue] = useState('');
    const searchRef = useRef(null);

    //Sử dụng useDispatch để gọi action
    const dispatch = useDispatch();
    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    });
    useEffect(() => {
        dispatch({ type: 'GET_LIST_PROJECT_SAGA' })
    }, [])
    const handleChange = (pagination, filters, sorter) => {
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };


    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortDirections: ['descend'],

        },
        {
            title: 'projectName',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record, index) => {
                return <NavLink to={`/projectdetail/${record.id}`}> {text}</NavLink>
            },
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName.trim().toLowerCase();
                let projectName2 = item2.projectName.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },

        },
        {
            title: 'category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName.trim().toLowerCase();
                let categoryName2 = item2.categoryName.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'creator',
            // dataIndex: 'creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color="green">{record.creator.name}</Tag>
            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator.name.trim().toLowerCase();
                let creator2 = item2.creator.name.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members.slice(0, 3).map((member, index) => {
                        return <Popover key={index} placement="top" title="members" content={() => {
                            return <table className="table">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>avatar</th>
                                        <th>name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record.members.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.userId}</td>
                                            <td><img src={item.avatar} alt={item.avatar} width="30" height="30" style={{ borderRadius: '15px' }} /></td>
                                            <td>{item.name}</td>
                                            <td>
                                                <button onClick={() => {
                                                    dispatch({
                                                        type: 'REMOVE_USER_PROJECT_API',
                                                        userProject: {
                                                            userId: item.userId,
                                                            projectId: record.id
                                                        }
                                                    })

                                                }} className="btn btn-danger" style={{ borderRadius: '50%' }}>X</button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }}>
                            <Avatar key={index} src={member.avatar} />
                        </Popover>
                    })}

                    {record.members.length > 3 ? <Avatar>...</Avatar> : ''}


                    <Popover placement="rightTop" title={"Add user"} content={() => {
                        return <AutoComplete

                            options={userSearch && userSearch.map((user, index) => {
                                return { label: user.name, value: user.userId.toString() }
                            })}
                            value={value}

                            onChange={(text) => {
                                setValue(text);
                            }}
                            onSelect={(valueSelect, option) => {
                                //set giá trị của hộp thọa = option.label
                                setValue(option.label);
                                //Gọi api gửi về backend
                                dispatch({
                                    type: 'ADD_USER_PROJECT_API',
                                    userProject: {
                                        "projectId": record.id,
                                        "userId": valueSelect
                                    }
                                })


                            }}
                            style={{ width: '100%' }} onSearch={(value) => {
                                if (searchRef.current) {
                                    clearTimeout(searchRef.current);
                                }
                                searchRef.current = setTimeout(() => {
                                    dispatch({
                                        type: 'GET_USER_API',
                                        keyWord: value
                                    })
                                }, 300)
                            }} />
                    }} trigger="click">
                        <Button style={{ borderRadius: '50%' }}>+</Button>
                    </Popover>
                </div>
            }

        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return <div>
                    <button className="btn me-2 btn-primary" onClick={() => {
                        const action = {
                            type: 'OPEN_FORM_EDIT_PROJECT',
                            title: 'Edit Project',
                            Component: <FormEditProject />,
                        }

                        //dispatch lên reducer nội dung drawer
                        dispatch(action);
                        //dispatch dữ liệu dòng hiện tai lên reducer
                        const actionEditProject = {
                            type: 'EDIT_PROJECT',
                            projectEditModel: record
                        }
                        dispatch(actionEditProject);
                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => {
                            dispatch({ type: 'DELETE_PROJECT_SAGA', idProject: record.id })
                        }}

                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="btn btn-danger">
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>
                </div>
            },
        }

    ];
    return (

        <div className="main container-fluid" >
            <div className="mt-3" >
                <h3>Project management</h3>
                <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
            </div>
        </div>
    )
}
