import { service } from '../utils/request(service)'

//获取文章分类的api
export async function getArtcate() {
    try {
        const response = await service({
            method: 'get',
            url: '/my/artcate/cates'
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

//增加文章分类的api
export async function addArtcates(data) {
    try {
        const response = await service({
            url: '/my/artcate/addcates',
            method: 'post',
            data,
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

// 修改文章分类的api
export async function updateArtcate(data) {
    try {
        const response = await service({
            url: '/my/artcate/updatecates',
            method: 'post',
            data,
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

// 删除文章分类的api
export async function deleteArtcate(id) {
    try {
        const response = await service({
            url: `/my/artcate/deletecates`,
            method: 'post',
            data: { id }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}