import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//添加文章分类组件
export default function Addcates({ onFinish }) {
    const [form] = Form.useForm();
    return (
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="name" />
            </Form.Item>
            <Form.Item
                name="alias"
                rules={[
                    {
                        required: true,
                        message: 'Please input your alias!',
                    },
                ]}
            >
                <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="alias" />
            </Form.Item>
            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched(true) ||
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        添加分类
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};