import React, { useState, useEffect } from 'react'
// 导入antd组件库
import { Layout, message, Menu, Dropdown, Avatar, Space } from 'antd';
//导入图标
import { EditOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, DownOutlined, SmileOutlined } from '@ant-design/icons';
// 引入路由
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
//导入api
import { myAxiosApi } from '../../api/http'
// 引入表单组件
import ChangePwdFrom from '../../components/ChangePwdFrom'
// 导入面包屑组件
import Breadcrum from '../../components/Breadcrumb';
//引入样式
import './index.less'

const { Header, Content, Footer, Sider } = Layout;

//左侧导航区域内容
function LeftMenu() {
  // 设置路由的跳转
  const navigate = useNavigate()
  const location = useLocation()
  // 设置当前页面的选中项
  const [selectKey, setSelectKey] = useState('')
  // 登录者权限获取
  const [auth, setAuth] = useState('')

  // 导航菜单的数组
  const adminMenu = [
    {
      id: 1,
      icon: <UserOutlined />,
      title: '用户列表',
      key: 'user',
      onClick: (text) => {
        setSelectKey(text.key)
        navigate('/user', { replace: true })
      }
    },
    {
      id: 2,
      icon: <UploadOutlined />,
      title: '文章分类列表',
      key: 'artcate',
      onClick: (text) => {
        setSelectKey(text.key)
        navigate('/artcate', { replace: true })
      }
    },
    {
      id: 3,
      icon: <VideoCameraOutlined />,
      title: '文章',
      key: 'articles',
      onClick: (text) => {
        setSelectKey(text.key)
        navigate('/articles', { replace: true })
      }
    },
    {
      id: 4,
      icon: <EditOutlined />,
      title: '文章编辑',
      key: 'edit',
      onClick: (text) => {
        setSelectKey(text.key)
        navigate('/edit', { replace: true })
      }
    },
    {
      id: 5,
      icon: <SmileOutlined />,
      title: '个人中心',
      key: 'profile',
      onClick: (text) => {
        setSelectKey(text.key)
        navigate('/profile', { replace: true })
      }
    },
  ]

  // 监视当前路由的切换，设置左侧菜单选择状态
  useEffect(() => {
    const key = location.pathname.split('/')[1]
    setSelectKey(key)
  }, [location.pathname])

  // 获取当前登录页面用户的权限
  useEffect(() => {
    const username = localStorage.getItem("username_react")
    myAxiosApi({ url: "/my/userinfo/auth", method: "post", data: { username } })
      .then(data => setAuth(data.auth))
  }, [])

  return (
    <Sider
      breakpoint="xl"
      collapsedWidth="96"
      collapsible='true'
    >
      <div className="logo"></div>
      <Menu theme="dark" mode="inline" selectedKeys={[selectKey]}>
        {
          auth === 1 ? adminMenu.map(item => (
            <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
              {item.title}
            </Menu.Item>
          )) :
            adminMenu.slice(2).map(item => (
              <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                {item.title}
              </Menu.Item>
            ))
        }
      </Menu>
    </Sider >
  )
}

//右侧区域内容
function Right() {
  let navigate = useNavigate();
  // 修改密码表单弹出框状态
  const [visible, setVisible] = useState(false)
  // 表单成功的执行函数
  const onCreate = (values) => {
    myAxiosApi({ url: "/my/updatepwd", method: "POST", data: values }).then((res) => {
      if (res.status === 0) {
        message.success(res.msg)
        navigate("/login", { replace: true })
      } else {
        message.error(res.message)
      }
    })
    setVisible(false);
  };

  // 退出登录与修改密码按键
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span type="text" onClick={() => setVisible(true)} style={{ display: 'block' }}>修改密码</span>
        {/* 表单 */}
        <ChangePwdFrom
          visible={visible}
          onCreate={onCreate}
          onCancel={() => setVisible(false)}
        />
      </Menu.Item>
      <Menu.Item key="1">
        <span style={{ display: 'block' }}
          onClick={() => {
            myAxiosApi({ url: "/api/logout", method: "post" }).then(res => {
              message.success(res.message)
              navigate('/login', { replace: true })
            })
          }}>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      {/* 界面头部分 */}
      <Header className="site-layout-sub-header-background">
        <span className='title'>React文章后台管理系统</span>
        {/* 右侧用户名显示区域 */}
        <Avatar size="large" icon={<UserOutlined />} className="avatar" />
        <Dropdown overlay={menu} trigger={['click']} className='username'>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()} href="https://">
            <Space size="small">
              <span>{localStorage.getItem('username_react')}</span>
              <DownOutlined style={{ fontSize: '15px' }} />
            </Space>
          </a>
        </Dropdown>
      </Header>
      {/* 界面内容部分 */}
      <Content style={{ margin: '24px 16px 0' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Breadcrum />
          {/* 路由显示区域 */}
          <Outlet />
        </div>
      </Content>
      {/* 界面底部部分 */}
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2022 Created by zhangyu</Footer>
    </Layout>
  )
}


export default function Home() {
  // 检测未登录强制跳转
  useEffect(() => {
    if (localStorage.getItem('token')) {
      return
    } else {
      window.location.replace('/login')
    }
  }, [])

  return (
    <div className='home'>
      <Layout>
        {/* 左侧部分 */}
        <LeftMenu />
        {/* 右侧侧部分 */}
        <Right />
      </Layout>
    </div >
  )
}

