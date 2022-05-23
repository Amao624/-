import { Modal, Form, Input } from 'antd'

// 修改密码弹出框组件
export default function ChangeArtcates({ visible, onCreate, onCancel }) {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="修改分类"
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
                    name="name"
                    label="新名称"
                    rules={[
                        {
                            required: true,
                            message: '请输入新的名称',
                            min: 1,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="alias"
                    label="新别名"
                    rules={[
                        {
                            required: true,
                            message: '请输入新别名!',
                            min: 1,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
