import React from 'react'
// 引入antd
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
//导入api
import { registerApi } from '../../api/user'

import logo from '../../assets/images/logo.png'

import './reguser.less'

export default function Register() {

    const onFinish = (value) => {
        const { password, repassword } = value
        if (password === repassword) {
            registerApi(value).then((res) => {
                console.log(res);
                if (res.data.status === 0) {
                    message.success(res.data.message)
                    setTimeout(() => {
                        window.location.replace('/login')
                    }, 2000)
                } else {
                    message.error(res.data.message)
                }
            })
        } else {
            message.error('两次输入的密码不同')
        }
    }

    return (
        <div className="reguser">
            <header className="reguser-header">
                <img src={logo} alt="logo" />
                <span>React:电商后台管理系统</span>
            </header>
            <section className="reguser-content">
                <h2>新用户注册</h2>
                <Form
                    name="normal_reguser"
                    className="reguser-form"
                    onFinish={onFinish}
                    layout="vertical"
                // onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        label="用户名"
                        rules={[
                            { required: true, whitespace: true, message: '请输入你的用户名!' },
                            { min: 4, message: '用户名需要不少于4位数!' },
                            { max: 12, message: '用户名最多12位数!' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文数字或下划线结尾！' }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="密码"
                        rules={[
                            { required: true, whitespace: true, message: '请输入你的密码!' },
                            { min: 4, message: '密码需要不少于4位数!' },
                            { max: 12, message: '密码最多12位数!' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文数字或下划线结尾！' }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="repassword"
                        label="确认密码"
                        rules={[
                            { required: true, whitespace: true, message: '请输入你的密码!' },
                            { min: 4, message: '密码需要不少于4位数!' },
                            { max: 12, message: '密码最多12位数!' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文数字或下划线结尾！' }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Link className="reguser-form-forgot" to="/login" >
                            去登录
                        </Link>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="reguser-form-button">
                            注册账号
                        </Button>
                    </Form.Item>
                </Form >
            </section>
        </div>
    )
}
