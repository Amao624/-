import { service } from '../utils/request(service)'


//用户登录
export async function loginApi(data) {
    try {
        const response = await service({
            url: '/api/login',
            method: 'post',
            data
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

//注册新用户
export async function registerApi(data) {
    try {
        const response = await service({
            url: '/api/reguser',
            method: 'post',
            data
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

// 用户退出登录
export async function userLogoutApi() {
    try {
        const response = await service({
            method: 'post',
            url: '/api/logout',
        })
        return response
    } catch (error) {
        console.log(error)
    }
}