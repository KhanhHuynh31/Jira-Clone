import React, { useState, useEffect } from 'react';
import { withFormik } from 'formik';
import {  Button, Input, Layout } from 'antd';
import { Link } from 'react-router-dom'
import { UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { USER_SIGN_UP_SAGA } from '../../../redux/constants/UserConstants';

function SignupCyberBug(props) {
    const [{ width, height }, setSize] = useState({ width: Math.round(window.innerWidth), height: Math.round(window.innerHeight) });

    useEffect(() => {
        window.onresize = () => {
            setSize({
                width: Math.round(window.innerWidth),
                height: Math.round(window.innerHeight)
            })
        }
    }, [])
    const { Sider, Content } = Layout;
    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;
    return (
        <Layout>
            <Sider width={width / 2} style={{ height: height, backgroundImage: `url(https://picsum.photos/2000`, backgroundSize: '100%' }}>
            </Sider>
            <Content>
                <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }} >
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: window.innerHeight }} >
                        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>Sign Up Jira Bugs </h3>
                        <div className="d-flex mt-3" >
                            <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="email" prefix={<UserOutlined />} />
                        </div>
                        <div className="text-danger">{errors.email}</div>

                        <div className="d-flex mt-3">
                            <Input.Password placeholder="password" style={{ width: '100%', minWidth: 300 }} size="large" className="my-2" name="passWord" onChange={handleChange} />
                        </div>
                        <div className="text-danger">{errors.password}</div>

                        <div className="d-flex mt-3">
                            <Input name="phoneNumber" style={{ width: '100%', minWidth: 300 }} size="large" className="my-2" placeholder="phone number" onChange={handleChange} prefix={<PhoneOutlined />} />
                        </div>
                        <div className="text-danger">{errors.phoneNumber}</div>

                        <div className="d-flex mt-3">
                            <Input name="name" style={{ width: '100%', minWidth: 300 }} size="large" className="my-2" placeholder="name" onChange={handleChange} prefix={<UserOutlined />} />
                        </div>
                        <div className="text-danger">{errors.name}</div>
                        <Button htmlType="submit" size="large" style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-5">Sign Up</Button>
                        <Link className="nav-link" to="/logincyberbugs">Go to Login</Link>

                    </div>
                </form>
            </Content>
        </Layout>
    )
}
const SignupCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        passWord: '',
        phoneNumber: '',
        name: ''
    }),

    validationSchema: Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is not valid"),
        passWord: Yup.string().min(6, "password must be from 6 - 12 char").max(12, "password must be from 6 - 12 char"),
        name: Yup.string().required("Name is required"),
        phoneNumber: Yup.number().required("Phone is required")

    }),
    handleSubmit: (values, { props, setSubmitting }) => {

        props.dispatch({
            type: USER_SIGN_UP_SAGA,
            signUpData: values,

        })
    },
})(SignupCyberBug);

export default connect()(SignupCyberBugsWithFormik); 
