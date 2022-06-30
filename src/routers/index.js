import React, { lazy, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
// 获取用户权限api
import { myAxiosApi } from "../api/http"

// 登录页面
import Login from '../pages/Login'
const Home = lazy(() => import('../pages/Home'))
const User = lazy(() => import('../pages/User'))
const Artcate = lazy(() => import('../pages/Artcate'))
const Articles = lazy(() => import('../pages/Articles'))
const Register = lazy(() => import('../pages/Register'))
const Profile = lazy(() => import('../pages/Profile'))
const Edit = lazy(() => import('../pages/Edit'))

// 模拟后台返回的路由
const routers = [
    {
        path: '/user',
        element: <User />
    },
    {
        path: '/artcate',
        element: <Artcate />
    },
    {
        path: '/articles',
        element: <Articles />
    },
    {
        path: '/articles/:id',
        element: <Articles />
    },
    {
        path: '/edit',
        element: <Edit />
    },
    {
        path: '/edit/:id',
        element: <Edit />
    },
    {
        path: '/profile',
        element: <Profile />
    },
]

export default function Myrouter() {
    const [router, setRouter] = useState(routers)

    useEffect(() => {
        const username = localStorage.getItem("username_react")
        myAxiosApi({ url: "/my/userinfo/auth", method: "post", data: { username } }).then(data => {
            if (data.auth === 0) setRouter(routers.slice(2))
        })
    }, [])

    return (
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/" element={<Navigate to="articles" />}></Route>
            <Route path="/" element={<Authrouter><Home /></Authrouter>}>
                {
                    router.map(item => (
                        <Route path={item.path} key={item.path} element={<Authrouter>{item.element}</Authrouter>}></Route>
                    ))
                }
            </Route>
            <Route path="*" element={<>404 NOFINDED</>}></Route>
        </Routes >
    )
}

function Authrouter({ children }) {
    const authConfig = localStorage.getItem("token")
    return authConfig ? children : <Navigate to="/login" />
}