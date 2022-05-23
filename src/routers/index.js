import React, {lazy} from 'react'
import {Navigate} from 'react-router-dom'

import Login from '../pages/Login'

const Home = lazy(() => import('../pages/Home'))
const User = lazy(() => import('../pages/User'))
const Artcate = lazy(() => import('../pages/Artcate'))
const Articles = lazy(() => import('../pages/Articles'))
const Register = lazy(() => import('../pages/Register'))
const Profile = lazy(() => import('../pages/Profile'))
const Edit = lazy(() => import('../pages/Edit'))
// const ArticleContent = lazy(() => import('../pages/ArticleContent'))

const router = [
    {
        path: '/login',
        element: < Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '',
        element: <Navigate to='/login'/>
    },
    {
        path: '/',
        element: < Home/>,
        children: [
            {
                path: 'user',
                element: < User/>,
            },
            {
                path: 'artcate',
                element: < Artcate/>
            },
            {
                path: 'articles',
                element: < Articles/>
            },
            {
                path: 'articles/:id',
                element: < Articles/>
            },
            {
                path: 'edit',
                element: < Edit/>
            },
            {
                path: 'edit/:id',
                element: < Edit/>
            },
            {
                path: 'profile',
                element: < Profile/>
            },
            {
                path: '',
                element: < Navigate to='/user'/>
            }
        ]
    },
]

export default router