import React, { useEffect, useState } from 'react'
import { Table, Space, message, Button, Popconfirm } from 'antd';
// 引入loading组件
import Loading from '../../components/Loading'
//引入api
import { myAxiosApi } from '../../api/http';
// 导入添加分类表单组件
import Addcates from '../../components/Addcates'
// 导入修改分类表单组件
import ChangeArtcates from '../../components/ChangeArtcates'
// 引入样式
import './index.less'

export default function Artcate() {
  // 文章分类的数据
  const [data, setData] = useState([])
  //设置页签的位置
  const [bottomCenter] = useState('bottomCenter')
  //loading状态
  const [loading, setLoading] = useState(true)
  // 表单弹出框状态
  const [visible, setVisible] = useState(false)
  // 获取选取修改对象的id
  const [userId, setUserId] = useState('')
  // 页面刷新的状态
  const [refresh, setRefresh] = useState('0')
  //获取文章分类的函数
  const getCates = () => {
    // 使用getArtcate Api函数
    myAxiosApi({ url: '/my/artcate/cates', method: 'get' })
      .then(res => {
        if (res.status === 0) {
          const newData = JSON.parse(JSON.stringify(res.data))
          newData.forEach((item, index) => {
            newData[index]['key'] = item.id
          })
          setData(newData)
          setLoading(false)
          message.success('获取文章分类数据成功！')
        } else {
          message.error('获取文章分类数据失败！')
        }
      })
  }

  //增加文章分类表单提交成功后的执行函数
  const onFinish = (values) => {
    setLoading(true)
    myAxiosApi({ url: '/my/artcate/addcates', method: 'post', data: values })
      .then((res) => {
        if (res.status === 0) return message.success(res.message)
        message.error(res.message)
      })
    setRefresh(refresh + 1)
  };

  // 更新文章分类表单成功的执行函数
  const onCreate = (values) => {
    setLoading(true)
    myAxiosApi({ url: '/my/artcate/updatecates', method: 'post', data: { ...values, id: userId } })
      .then((res) => {
        if (res.status === 0) return message.success(res.message)
        message.error(res.message)
      })
    setVisible(false)
    setRefresh(refresh + 1)
  };

  useEffect(() => {
    let isMounted = true
    // 页面加载就调用获取文章分类的函数
    if (isMounted) {
      setTimeout(() => { getCates() }, 1499)
    }
    return () => {
      isMounted = false
      setLoading(false)
    }
    // 依赖数据refresh改变页面就刷新
  }, [refresh])

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '别名',
      dataIndex: 'alias',
      key: 'alias',
    },
    {
      title: '操作',
      key: 'action',
      render: (text) => (
        <Space size="large">
          <Button type='primary' onClick={() => {
            setVisible(true)
            setUserId(text.key)
          }}>修改信息</Button>
          <Popconfirm
            title="你确定要删除嘛！"
            onConfirm={() => {
              myAxiosApi({ url: `/my/artcate/deletecates`, method: 'post', data: { id: text.key } })
                .then(res => {
                  if (res.status === 0) return message.success(res.message)
                  message.error(res.message)
                })
              setRefresh(refresh + 1)
            }}
            okText="确认"
            cancelText="取消"
          >
            <Button type='primary' danger>删除分类</Button>
          </Popconfirm>
        </Space >
      ),
    },
  ];

  return (
    <div className="artcate">
      <ChangeArtcates
        visible={visible}
        onCreate={onCreate}
        onCancel={() => setVisible(false)}
      />
      {/* 添加分类的表单 */}
      <Addcates onFinish={onFinish} />
      {/* 数据表格 */}
      < Table
        bordered='true'
        columns={columns}
        dataSource={data}
        style={{ marginTop: '10px' }}
        scroll={{ y: 500 }}
        pagination={{ position: [bottomCenter], pageSize: 15 }}
      />
      <Loading spinning={loading} />
    </div>
  )
}

