import React, { Fragment, Suspense } from 'react'
import Loading from './components/Loading'
// 映射路由
import Myrouter from './routers'
//导入app的样式
import './App.less'

export default function App() {
  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        {/* 路由 */}
        <Myrouter />
      </Suspense >
    </Fragment>
  )
}
