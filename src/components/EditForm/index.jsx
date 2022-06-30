import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd'
import { useParams } from "react-router-dom";
//导入获取文章分类的api
import { myAxiosApi } from "../../api/http"

// 修改密码弹出框组件
export default function EditForm({ visible, onCreate, onCancel, ...cateInfo }) {
    const [form] = Form.useForm();
    const params = useParams()
    // 获取分类的选项
    const [data, setData] = useState([])

    const getCate = () => {
        // 获取文章分类的api'
        if (params.id) {
            myAxiosApi({ url: '/my/artcate/cates', method: 'GET' })
                .then(res => {
                    const arr = res.data
                    const result = arr.filter(value => (value.id === { ...cateInfo }.cateId))
                    setData(result)
                })
        } else {
            myAxiosApi({ url: '/my/artcate/cates', method: 'GET' })
            .then(res => setData(res.data))
        }
    }

    useEffect(() => {
        let isMound = true;
        if (isMound) {
            // 调用获取文章分类的方法
            getCate()
        }
        return () => {
            isMound = false;
        }
    }, [visible])


    return (
        <Modal
            visible={visible}
            title="发布文章"
            okText="确认"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields() //校验
                    .then((values) => {
                        form.resetFields(); // reset重置
                        //成功的回调
                        onCreate(values);
                    })
            }}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{ title: { ...cateInfo }.title }}
            >
                <Form.Item
                    name="cate_id"
                    label="发布文章种类"
                    rules={[
                        {
                            required: true,
                            message: '请选择你要发布的文章种类',
                        },
                    ]}
                >
                    <Select>
                        {
                            data.map(item => (
                                <Select.Option values={item.id} key={item.id}>{item.name}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="title"
                    label="文章标题"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的文章标题!',
                            min: 0,
                            max: 12
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
