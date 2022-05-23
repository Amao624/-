import { service } from '../utils/request(service)'

// 获取当前登录用户的信息
export async function userApi() {
    try {
        const response = await service({
            url: '/my/userinfo',
            method: 'get',
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

//修改用户密码
export async function changePwdApi(data) {
    try {
        const response = await service({
            url: '/my/updatepwd',
            method: 'post',
            data,
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

//修改用户信息
export async function changeUserinfo(data) {
    try {
        const response = await service({
            url: '/my/userinfo',
            method: 'post',
            data,
        })
        return response
    } catch (error) {
        console.log(error)
    }
}
