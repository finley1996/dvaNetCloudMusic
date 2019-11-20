import React from "react"
// import { connect } from "tls";
import { Modal, Button, WhiteSpace, WingBlank, List, Card, NavBar, Icon } from 'antd-mobile';
import { connect } from 'dva'
import "../components/recommend.css";
import { nonsense } from "antd-mobile/lib/picker";
import { withRouter, routerRedux } from 'dva/router'
const Item = List.Item;
const Brief = Item.Brief;


const operation = Modal.operation;
class PlayVideo extends React.Component {
    constructor() {
        // const _id = JSON.parse(localStorage.getItem("mvid"))
        super()
        // const dataSource = new ListView.DataSource({
        //     rowHasChanged: (row1, row2) => row1 !== row2
        // });

        this.state = {
            vidiosrc: "",
            vidiodetail: {},
            //dataSource,
            //height: document.documentElement.clientHeight,//设置listView的高度
            // refreshing: true
            usercomments: [],
            data: []
        };
    }

    back = () => {
        this.props.history.go(-1)
    }

    componentWillMount() {
        let id = localStorage.getItem('mvid')
        fetch('/api/mv/detail?mvid=' + id).then(body => body.json()).then(
            res => {
                console.log(res)
                this.setState(
                    {
                        vidiodetail: res.data,
                        vidiosrc: res.data.brs['480']
                    }
                )
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

    render() {
        // console.log()
        const mvname = this.state.vidiodetail.name
        const singername = this.state.vidiodetail.artistName
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" onClick={() => { this.back() }}/>}
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
                                        <img style={{ height: '80px', width: '110px', marginRight: '15px', objectFit: "cover" }} src={item.coverUrl} alt="" />
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
                    <WhiteSpace size="lg" />
                    <List renderHeader={() => '热门评论'} className="my-list" onClick={() => operation([
                        {
                            text: '回复评论', onPress: () => {
                                console.log(111)
                                return (
                                    alert("1111")
                                )
                            }
                        },
                        { text: '分享评论', onPress: () => console.log('置顶聊天被点击了') },
                        { text: '复制评论', onPress: () => console.log('置顶聊天被点击了') },
                        { text: '举报评论', onPress: () => console.log('置顶聊天被点击了') },
                    ])}>
                        {
                            this.state.usercomments.map(item => {
                                return (
                                    <div key={item.commentId}>
                                        <WhiteSpace size="lg" />
                                        <Card full>
                                            <Card.Header
                                                thumb={item.user.avatarUrl}
                                                extra={<span>{item.user.nickname}</span>}
                                            />
                                            <Card.Body>
                                                <div>{item.content}</div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })
                        }

                    </List>
                    <WhiteSpace size="lg" />
                </div>
            </div>
        )
    }
}

export default connect()(PlayVideo) 