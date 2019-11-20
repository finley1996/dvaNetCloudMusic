import React from "react"
import ReactDOM from "react-dom"
// import { connect } from "tls";
import { Modal, Button, WhiteSpace, WingBlank, List, Card, NavBar, Icon, } from 'antd-mobile';
import { connect } from 'dva'
import "../components/recommend.css";
const Item = List.Item;
const Brief = Item.Brief;


const operation = Modal.operation;
class PlayVideo extends React.Component {
    constructor() {
        super()
        this.state = {
            vidiosrc: "",
            vidiodetail: {},
            usercomments: [],
            data: []
        };
    }

    // 上一页
    back = () => {
        this.props.history.go(-1)
    }

    // 请求方法的封装
    getmv = () => {
        let id = localStorage.getItem('mvid')
        fetch('/api/mv/detail?mvid=' + id).then(body => {
            if(body.ok){
                return body.json()
            }else{
                return {
                    code:400
                }
            }
            }).then(
            res => {
                console.log(res)
                if(res.code=='200'){
                    this.setState(
                        {
                            vidiodetail: res.data,
                            vidiosrc: res.data.brs['480']
                        }
                    )
                }else{
                    alert('该视频资源不存在啦！请更换视频播放')
                    return false
                }
               
            }
        )
        fetch('/api/comment/mv?id=' + id).then(body => body.json()).then(
            res => {
                console.log(res.hotComments)
                this.setState({
                    usercomments: res.hotComments
                })
            }
        )
        fetch('/api/related/allvideo?id=' + id).then(body => body.json()).then(
            res => {
                console.log(res.data, "======1")
                this.setState({
                    data: res.data
                })
            }
        )
    }
     // 加载时请求
     componentWillMount() {
          this.getmv()
    }

    //跳转到相关视频的详情页 
    getmvid = (id) => {
        localStorage.setItem("mvid", id)
        this.getmv()
    }
    render() {
        // console.log()
        // 
        const mvname = this.state.vidiodetail.name
        const singername = this.state.vidiodetail.artistName
        const commondlist = this.state.usercomments?this.state.usercomments.map(item => {
            return (
                <div key={item.commentId} onClick={() => operation([
                    {
                        text: '回复评论', onPress: () => {
                            console.log(111)
                        }
                    },
                    { text: '分享评论', onPress: () => console.log('置顶聊天被点击了') },
                    { text: '复制评论', onPress: () => console.log('置顶聊天被点击了') },
                    { text: '举报评论', onPress: () => console.log('766776') },
                ])}>
                    <WhiteSpace size="lg" />
                    <Card full>
                        <Card.Header
                            thumb={item.user.avatarUrl}
                            extra={<span
                                style={{
                                    fontSize: '16px',
                                    color: "pink"
                                }}
                            >{item.user.nickname}</span>}
                        />
                        <Card.Body>
                            <div
                                style={
                                    {
                                        fontSize: '14px',
                                        textIndent: "2em",
                                        lineHeight: "24px"
                                    }}
                            >{item.content}</div>
                        </Card.Body>
                    </Card>
                </div>
            )
        }):null
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" onClick={() => { this.back() }} />}
                // onLeftClick={() => console.log('onLeftClick')}
                >MV</NavBar>
                <div>
                    <video
                        src={this.state.vidiosrc}
                        style={{ width: "100%", height: "100%" }}
                        controls
                    />
                </div>
                <div >
                    <List renderHeader={() => 'MV信息'} className="my-list">
                        <Item extra={singername}>{mvname}</Item>
                    </List>
                </div>

                <div>
                    <List renderHeader={() => "相关视频"} className="my-list">
                        {
                            this.state.data.map(item => {
                                return (
                                    <div key={item.vid} style={{ padding: '10px 15px', position: 'relative', }}>
                                        <img style={{
                                            height: '80px',
                                            width: '110px',
                                            marginRight: '15px',
                                            objectFit: "cover"
                                        }} onClick={() => this.getmvid(item.vid)} src={item.coverUrl} alt="" />
                                        <span
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                lineHeight: '30px',
                                                color: '#888',
                                                fontSize: 14,
                                            }}
                                        >
                                            {item.title}
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </List>

                </div>

                <div>
                    {/* 举报按钮的弹出详情 */}
                    {/* <WhiteSpace size="lg" />
                    <Button onClick={() => operation([
                        { text: '段子或无意义的评论', onPress: () => console.log('标为未读被点击了') },
                        { text: '恶意攻击谩骂', onPress: () => console.log('置顶聊天被点击了') },
                        { text: '营销广告', onPress: () => console.log('置顶聊天被点击了') },
                        { text: '淫秽色情', onPress: () => console.log('置顶聊天被点击了') },
                        { text: '政治反动', onPress: () => console.log('置顶聊天被点击了') },
                        { text: '其他原因', onPress: () => console.log('置顶聊天被点击了') },
                    ])}
                    ></Button>
                    <WhiteSpace size=" lg" /> */}

                    <WhiteSpace size="lg" />
                    <List renderHeader={() => '热门评论'} className="my-list" >
                        {
                            commondlist
                        }

                    </List>
                    <WhiteSpace size="lg" />
                </div>
            </div>
        )
    }
}

export default connect()(PlayVideo) 