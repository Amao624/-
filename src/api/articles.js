import { service } from '../utils/request(service)'

// 获取文章的接口
export async function getArticles() {
    try {
        const response = await service({
            method: 'get',
            url: '/my/articles/list'
        })
        return response
    } catch (error) {
        console.log(error);
    }
}

// 根据文章id获取文章内容
export async function getArticlesById(id) {
    try {
        const response = await service({
            method: 'get',
            url: `/my/articles/find/${id}`
        })
        return response
    } catch (error) {
        console.log(error);
    }
}

// 发布新文章的接口
export async function addArticles(data) {
    try {
        const response = await service({
            method: 'post',
            url: '/my/articles/add',
            data
        })
        return response
    } catch (e) {
        console.log(e);
    }
}

// 修改文章的接口
export async function changeArticles(data) {
    try {
        const response = await service({
            method: 'post',
            url: '/my/articles/change',
            data
        })
        return response
    } catch (e) {
        console.log(e);
    }
}

// 删除文章的接口
export async function deleteArticles(id) {
    try {
        const response = await service({
            method: 'post',
            url: '/my/articles/delete',
            data: id
        })
        return response
    } catch (e) {
        console.log(e);
    }
}