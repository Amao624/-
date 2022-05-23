import React, { Fragment, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import Loading from './components/Loading'
// 映射路由
import routes from './routers'
//导入app的样式
import './App.less'

export default function App() {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        {useRoutes(routes)}
      </Suspense >
    </Fragment>
  )
}
