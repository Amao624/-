import React, {useState, useEffect} from 'react';
import {Modal, Form, Input, Select} from 'antd'
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {useParams} from "react-router-dom";
//导入获取文章分类的api
import {getArtcate} from "../../api/artcates";

// 修改密码弹出框组件
export default function EditForm({visible, onCreate, onCancel, ...cateInfo}) {
    const [form] = Form.useForm();
    const params = useParams()
    // 加载状态
    // const [loading, setLoading] = useState(false)
    // 获取图片的路径
    // const [imageUrl, setImage] = useState('')
    // 获取分类的选项
    const [data, setData] = useState([])

    /* function beforeUpload(file) {
        console.log(file);
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2kb = file.size / 1024 / 1024 / 1024 < 2;
        if (!isLt2kb) {
            message.error('Image must smaller than 2kb!');
        }
        return isJpgOrPng && isLt2kb;
    } */

    /* function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    } */

    // 图片加载
    /* const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => {
                setLoading(false)
                setImage(imageUrl)
            });
        }
        setLoading(false)
    }; */

    // 图片加载图标样子
    /* const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: '10px' }}>Upload</div>
        </div>
    ); */

    const getCate = () => {
        // 获取文章分类的api'
        if (params.id) {
            getArtcate().then(res => {
                const arr = res.data.data
                const result = arr.filter(value => (value.id === {...cateInfo}.cateId))
                setData(result)
            })
        } else {
            getArtcate().then(res => setData(res.data.data))
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
                initialValues={{title: {...cateInfo}.title}}
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
                    <Select style={{width: '100%'}}>
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
                    <Input/>
                </Form.Item>
                {/* <Form.Item
                    name="subTitle"
                    label="副标题"
                >
                    <Input />
                </Form.Item> */}
                {/* <Upload
                        name="cover_img"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="http://127.0.0.1:8888/my/articles/add"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        maxCount={1}
                        headers={{ 'Authorization': localStorage.getItem('token') }}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload> */}
            </Form>
        </Modal>
    );
};
