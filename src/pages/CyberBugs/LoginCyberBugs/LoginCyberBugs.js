import React, { useState, useEffect } from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Input, Layout } from 'antd';
import { withFormik } from 'formik'
import * as Yup from 'yup';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { singinCyberbugAction } from '../../../redux/actions/CyberBugsActions';
function LoginCyberBugs(props) {
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
                        <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>Login Jira Bugs </h3>
                        <div className="d-flex mt-3" >
                            <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size="large" placeholder="email" prefix={<UserOutlined />} />
                        </div>
                        <div className="text-danger">{errors.email}</div>
                        <div className="d-flex mt-3">
                            <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="password" size="large" placeholder="password" prefix={<LockOutlined />} />
                        </div>
                        <div className="text-danger">{errors.password}</div>

                        <Button htmlType="submit" size="large" style={{ minWidth: 300, backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className="mt-5">Login</Button>
                        <Link className="nav-link" to="/signupcyberbugs">Go to Sign Up</Link>
                        
                    </div>
                </form>
            </Content>
        </Layout>

    )
}
const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),
    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('email is invalid!'),
        password: Yup.string().min(6, 'password must have min 6 characters').max(32, 'password  have max 32 characters')

    }),
    handleSubmit: ({ email, password }, { props }) => {
        props.dispatch(singinCyberbugAction(email, password));
    },
    displayName: 'Login CyberBugs',
})(LoginCyberBugs);




export default connect()(LoginCyberBugsWithFormik);