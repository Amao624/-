import { service } from '../utils/request(service)'

export async function myAxiosApi(...args) {
    const { method, url, data } = args[0]
    let info = {
        url,
        method: method.toLowerCase(),
    }
    if (typeof data === "object") {
        info["data"] = data
    }
    try {
        const response = await service(info)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
