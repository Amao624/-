import React, { useState, useEffect } from 'react'
// 导入loading组件
import Loading from '../../components/Loading'

export default function Profile() {
  const [loading, setLoading] = useState(true)
  useEffect(() =>
    setTimeout(() => { setLoading(false) }, 1499)
  )

  return (
    <div>
      <Loading spinning={loading} />
    </div>
  )
}
