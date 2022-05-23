import React, {useEffect, useState, Fragment} from 'react';
import {Button, List, message, Popconfirm, Space} from 'antd';
import {LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons';
import {useNavigate, useParams} from 'react-router-dom'
import {connect} from 'react-redux'
// 导入文章内容详细信息
import ArticleContent from '../ArticleContent'
//导入loading组件
import Loading from '../../components/Loading'
// 导入api
import {deleteArticles, getArticles} from '../../api/articles'
// 导入样式
import './index.less'


function Articles(props) {
    // 获取文章数据状态
    const [data, setData] = useState([])
    //loading状态
    const [loading, setLoading] = useState(true)
    // 页面刷新的状态
    const [refresh, setRefresh] = useState('0')

    const navigate = useNavigate()
    const params = useParams()
    // 获取当前文章的数据
    const getData = () => {
        getArticles().then(res => {
            if (res.data.status === 0) {
                setLoading(false)
                setData(res.data.data)
                message.success('获取文章数据成功！')
            } else {
                message.error('获取文章数据失败！')
            }
        })
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setTimeout(() => {
                getData()
            }, 1499)
        }
        return () => {
            isMounted = false;
        }
    }, [refresh]);

    // 点赞评论按钮
    const IconText = ({icon, text}) => (<Space>
        {React.createElement(icon)}
        {text}
    </Space>);

    return (<div className="container">
        {params.id ?
            <ArticleContent
            /> : <Fragment>
                <Space size='large' direction='horizontal' style={{marginBottom: '20px'}}>
                    <Button type='primary' onClick={() => navigate('/edit', {replace: true})}>增加文章</Button>
                    <Button type='primary'>查找文章</Button>
                </Space>
                <List
                    itemLayout="vertical"
                    size="middle"
                    dataSource={data}
                    renderItem={item => (/* 点赞评论转发 */
                        <List.Item
                            key={item.id}
                            actions={[<IconText icon={StarOutlined} text="0" key="list-vertical-star-o"/>,
                                <IconText icon={LikeOutlined} text="0" key="list-vertical-like-o"/>,
                                <IconText icon={MessageOutlined} text="0" key="list-vertical-message"/>,]}
                            /*尾部按钮部分*/
                            extra={<Space size='large' style={{marginRight: '50px'}}>
                                <Button type='primary' size='large'
                                        onClick={() => navigate('/edit/' + item.id)}>修改文章</Button>
                                <Popconfirm
                                    title="你确定要删除该文章吗！"
                                    onConfirm={() => {
                                        deleteArticles({id: item.id}).then((res) => {
                                            if (res.data.status === 0) return message.success(res.data.message)
                                            message.error(res.data.message)
                                        })
                                        setRefresh(refresh + 1)
                                    }}
                                    okText="确认"
                                    cancelText="取消"
                                >
                                    <Button type='primary' size='large' danger>删除文章</Button>
                                </Popconfirm>
                            </Space>}
                        >
                            <List.Item.Meta
                                // avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href} style={{fontSize: '18px'}}
                                          onClick={() => {
                                              navigate('/articles/' + item.id)
                                              props.changeArticle({title: item.title, content: item.content})
                                          }}>{item.title}</a>}
                                description={item.content}
                            />
                            <span>发布于：{item.pub_date}</span>
                        </List.Item>)}></List>
            </Fragment>}
        {/* 加载图标 */}
        <Loading spinning={loading}/>
    </div>)
}

export default connect(null,
    (dispatch) => ({
        changeArticle(data) {
            dispatch({type: 'changeTitle', data})
        }
    })
)(Articles)