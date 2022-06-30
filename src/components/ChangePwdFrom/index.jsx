import { Modal, Form, Input } from 'antd'

// 修改密码弹出框组件
export default function ChangePwdFrom({ visible, onCreate, onCancel }) {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="修改密码"
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
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                <Form.Item
                    name="oldPwd"
                    label="旧密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入旧密码(6-12位)!',
                            max: 12,
                            min: 6
                        },
                    ]}
                >
                    <Input type="password"/>
                </Form.Item>
                <Form.Item
                    name="newPwd"
                    label="新密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入新密码(6-12位)!',
                            max: 12,
                            min: 6
                        },
                    ]}
                >
                    <Input type="password"/>
                </Form.Item>
            </Form>
        </Modal>
    );
};
