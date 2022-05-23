import React, { Fragment } from 'react'
import moment from 'moment'
import './index.less'

export default function NowDate() {
    const time = moment(new Date()).format('YYYY-MM-DD')
    return (
        <Fragment>
            当前时间为：{time}
        </Fragment>
    )
}
