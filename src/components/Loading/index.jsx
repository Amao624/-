import React from 'react'
import { Spin } from 'antd';

import './index.less'

export default function Loading({ spinning }) {
    return (
        <Spin size='large' delay='1' tip="Loading..." spinning={spinning} />
    )
}
