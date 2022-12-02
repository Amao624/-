import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

export default function Bread() {
    const [breadName, setBreadName] = useState('')
    const { pathname } = useLocation()
    // 监听的路由  /user /artcate /articles /profile
    useEffect(() => {
        switch (pathname) {
            case '/user':
                setBreadName('用户列表')
                break;
            case '/artcate':
                setBreadName('文章分类')
                break;
            case '/articles':
                setBreadName('文章列表')
                break;
            case '/edit':
                setBreadName('文章编辑')
                break;
            case '/profile':
                setBreadName('个人中心')
                break;
            default:
                setBreadName('文章详细内容')
                break;
        }
    }, [pathname])
    return (
        <Breadcrumb>
            <Breadcrumb.Item href="/user">
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href={pathname}>{breadName}</Breadcrumb.Item>
        </Breadcrumb>
    )
}