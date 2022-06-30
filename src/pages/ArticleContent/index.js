import { useState, useEffect } from "react";
// import { getArticlesById } from "../../api/articles"
import { myAxiosApi } from "../../api/http"

export default function ArticleContent({ id }) {

    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
        myAxiosApi({ url: `/my/articles/find/${id}`, method: 'GET' }).then(res => {
            setTitle(res.data[0].title)
            setContent(res.data[0].content)
        })
    }, [])

    return (
        <div className='content'>
            <h1 style={{ fontSize: '24px', textAlign: 'center', margin: '10px 0' }}>{title}</h1>
            <span>{content}</span>
        </div>
    )
}