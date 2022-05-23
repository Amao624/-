// import {useState, useEffect} from "react";
import {connect} from "react-redux";

function ArticleContent({title, content}) {
    // const {title, content} = data
    // const [artTitle, setArtTitle] = useState('')
    // const [artContent, setArtContent] = useState('')
    // useEffect(() => {
    //     setArtTitle(title)
    //     setArtContent(content)
    // }, [])

    return (
        <div className='content'>
            <h1 style={{fontSize: '24px', textAlign: 'center', margin: '10px 0'}}>{title}</h1>
            <span>{content}</span>
        </div>
    )
}

export default connect(
    state => ({
        title: state.title,
        content: state.content,
    }),
    null
)(ArticleContent)