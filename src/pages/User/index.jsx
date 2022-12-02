import React, { useEffect, useState } from 'react'
import { Table, Space, Tag, Button, message } from 'antd'
//导入loading组件
import Loading from '../../components/Loading'
//导入api
import { myAxiosApi } from '../../api/http'
// 导入修改信息的表单组件
import ChangeUserinfoForm from '../../components/ChangeUserinfoForm'

export default function User() {
    //设置页签的位置
    const [bottomCenter] = useState('bottomCenter')
    //用户数据状态
    const [data, setData] = useState([])
    // 表单弹出框状态
    const [visible, setVisible] = useState(false);
    // 获取选取修改对象的id
    const [userId, setUserId] = useState('')
    //loading状态
    const [loading, setLoading] = useState(true)
    // 页面刷新的状态
    const [refresh, setRefresh] = useState(0)
    // 获取选取按钮对象的用户名
    const [username, setUsername] = useState('')
    // 获取选取按钮对象的邮箱
    const [email, setEmail] = useState('')
    // 获取选取按钮对象的别名
    const [nickname, setNickname] = useState('')

    const userinfo = { username, email, nickname }

    //获取用户信息方法
    const getUserInfo = () => {
        myAxiosApi({ url: "/my/userinfo", method: 'GET' }).then(res => {
            if (res.status === 0) {
                setLoading(false)
                res.data.forEach((item, index) => {
                    res.data[index]['key'] = item.id
                })
                setData(res.data)
                message.success('获取用户数据成功！')
            } else {
                message.error('获取数据失败！')
            }
        })
    }

    //表单提交成功后函数
    const onCreate = (value) => {
        //启动loading界面
        setLoading(true)
        // 调用给改变用户信息api
        myAxiosApi({ url: '/my/userinfo', method: "post", data: { ...value, id: userId } })
            .then(res => {
                if (res.status === 0) return message.success(res.msg)
                message.error('修改信息失败!')
            })
        // 关闭表单框
        setVisible(false)
        // 使页面刷新一次
        setRefresh(refresh + 1)
    }

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            setTimeout(() => { getUserInfo() }, 1499)
        }
        return () => {
            isMounted = false
            setLoading(false)
        }
    }, [refresh])

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '绰号',
            key: 'nickname',
            dataIndex: 'nickname',
        },
        {
            title: 'Tags',
            key: 'auth',
            dataIndex: 'auth',
            render: (text) => {
                return (
                    <Tag color={text !== 0 ? 'red' : 'green'}>
                        {text === 0 ? '用户' : '管理员'}
                    </Tag>
                )
            },
        },
        {
            title: '操作',
            key: 'action',
            render: (text) => (
                <Space size="middle" >
                    <Button
                        type="primary"
                        onClick={() => {
                            setVisible(true)
                            const { id, username, email, nickname } = text
                            setUserId(id)
                            setUsername(username)
                            setEmail(email)
                            setNickname(nickname)
                        }}>
                        修改信息
                    </Button>
                </Space >
            ),
        },
    ];

    return (
        <div className="user">
            <Loading spinning={loading} />
            <Table
                bordered='true'
                columns={columns}
                dataSource={data}
                pagination={{ position: [bottomCenter] }}
            />
            <ChangeUserinfoForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => setVisible(false)}
                {...userinfo}
            />
        </div>
    )

}




