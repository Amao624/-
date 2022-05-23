import {useEffect} from "react"
import { Modal, Form, Input } from 'antd'

// 修改密码弹出框组件
export default function ChangeUserinfoForm({ visible, onCreate, onCancel , ...userinfo }) {
    const [form] = Form.useForm();

    useEffect(() =>{
        form.setFieldsValue({...userinfo})
    },[visible])

    return (
        <Modal
            forceRender={true}
            visible={visible}
            title="修改信息"
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        //成功的回调
                        onCreate(values);
                    })
                    .catch(() => {
                        return 0
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        {
                            required: false,
                            message: '请输入您的用户名(4-12位)!',
                            min: 4,
                            max: 12
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        {
                            required: false,
                            message: '请输入正确的邮箱!',
                            max: 50,
                            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="nickname"
                    label="绰号"
                    rules={[
                        {
                            required: false,
                            message: '请输入您的绰号!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal >
    );
};
