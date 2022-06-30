import React, { useState, useEffect } from 'react'
import { PageHeader, Button, message } from 'antd'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
// 导入富文本编辑器
import E from 'wangeditor'
//引入当前时间组件
import NowDate from '../../components/NowDate'
// 引入提交文章表单
import EditForm from '../../components/EditForm'
// 引入发布文章的api
import { myAxiosApi } from '../../api/http'

let edit = null;
export default function Edit() {
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    // 富文本框的内容
    const [content, setContent] = useState('')
    // 表单弹出框状态
    const [visible, setVisible] = useState(false)
    // 设置标题
    const [title, setTitle] = useState('')
    // 设置种类
    const [cateId, setCateId] = useState()
    // 定义初始化文本编辑器
    const initEdit = () => {
        edit = new E('#div1')
        edit.config.onchange = () => {
            setContent(edit.txt.text())
        }
        // 设置编辑区域高度为 500px
        edit.config.height = 500
        // 创建文本编辑器
        edit.create()

        // 判断是否是带有id的编辑文章情况
        if (params.id) {
            myAxiosApi({ url: `/my/articles/find/${parseInt(params.id)}`, method: 'GET' })
                .then(res => {
                    if (res.status === 0) {
                        // 解构赋值请求回来的数据
                        const { title, cate_id, content } = res.data[0]
                        setTitle(title)
                        setCateId(cate_id)
                        edit.txt.html(`<p>${content}<p>`)
                    }
                })
        }
    }

    useEffect(() => {
        let isMounded = true
        if (isMounded) {
            initEdit()
        }
        return () => {
            edit.destroy()
            isMounded = false
        }
    }, [location.pathname])


    // 发布文章按钮表单成功的执行函数
    const onCreate = (values) => {
        // 修改文章的api接口
        if (params.id) {
            myAxiosApi({ url: "/my/articles/change", method: "POST", data: { content, id: params.id, title: values.title } })
                .then(res => {
                    if (res.status !== 0) return message.error(res.message)
                    message.success(res.message)
                    navigate('/articles', { replace: true })
                })
        } else {
            // 增加文章的api接口
            myAxiosApi({ url: '/my/articles/add', method: 'POST', data: { ...values, content: content } })
                .then(res => {
                    if (res.status !== 0) return message.error(res.message)
                    message.success(res.message)
                    navigate('/articles', { replace: true })
                })
        }
        setVisible(false)
    };

    // 传递给editform表单的分类信息
    const cateInfo = { title, cateId }

    return (
        <div className="edit">
            <EditForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => setVisible(false)}
                {...cateInfo}
            />
            <PageHeader
                title="文章编辑"
                subTitle={<NowDate />}
                onBack={params.id ? () => window.history.back() : null}
                extra={<Button size='large' type='primary' onClick={() => {
                    if (content === '') message.warn('请输入你的文章')
                    // 判断是否是文章内容是否有数字、字母、汉字
                    if (/[\u4E00-\u9FA5_a-zA-Z0-9_]/.test(content)) {
                        if (content.split(' ').every(item => item === '&nbsp;')) {
                            return message.error('文章内容不能为空，请编写你的文章！！！')
                        }
                        setVisible(true)
                    }
                }}>发布文章</Button>}
                style={{ borderBottom: '1px solid rgb(235, 237, 240)' }}
            />
            <br />
            <div id='div1' style={{
                position: 'relative',
                zIndex: '9'
            }}></div>
        </div>
    )
}
