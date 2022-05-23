import React, {Component} from 'react'
// 引入antd
import {Form, Input, Button, Checkbox, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
// 引入api
import {loginApi} from '../../api/user'

// 引入login样式
import './login.less'
import logo from '../../assets/images/logo.png'

/* 
    登录的路由组件
*/
export default class Login extends Component {
    onFinish = (values) => {
        loginApi(values).then((res) => {
            if (res.data.status === 0) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('username_react', values.username)
                window.location.replace('/user')
            } else {
                message.error(res.data.message)
            }
        })
    }

    onFinishFailed = ({values, errorFields, outOfDate}) => {
        message.error('请输入正确的账号与密码!')
    }

    render() {
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <span>React:文章后台管理系统</span>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{remember: true}}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {required: true, whitespace: true, message: '请输入你的用户名!'},
                                {min: 4, message: '用户名需要不少于4位数!'},
                                {max: 12, message: '用户名最多12位数!'},
                                {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文数字或下划线结尾！'}
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {required: true, whitespace: true, message: '请输入你的密码!'},
                                {min: 4, message: '密码需要不少于4位数!'},
                                {max: 12, message: '密码最多12位数!'},
                                {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文数字或下划线结尾！'}
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>remember me</Checkbox>
                            </Form.Item>
                            <Link className="login-form-forgot" to="/register">
                                去注册
                            </Link>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
