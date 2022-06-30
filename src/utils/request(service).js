import axios from "axios"

// 第一步，创建实例
const service = axios.create({
    baseURL: 'http://127.0.0.1:8888', //设置基础url
    timeout: 2000,
})

// 第二部，请求拦截
service.interceptors.request.use(function (config) {
    const { url } = config
    if (
        // url.startsWith('/my') && 
        !url.startsWith('/api')
    ) {
        // 添加请求头
        config.headers.Authorization = localStorage.getItem('token')
    }
    return config
})

// 第三步，响应拦截
service.interceptors.response.use(function (response) {
    const { status } = response.data
    if (status === 200) {
        // 此时退出登录，说明 token 失效，直接移除 token 即可
        localStorage.removeItem('token')
        localStorage.removeItem('username_react')
    }
    return response
})

export { service } 