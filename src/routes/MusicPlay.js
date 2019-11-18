import React from 'react';
import { connect } from 'dva'
import styles from './Musicplay.css'
import ListItem from 'antd-mobile/lib/list/ListItem';
import { Card, WhiteSpace } from 'antd-mobile';
import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
class MusicPlay extends React.Component {
    constructor() {
        super()
        this.state = {
            isplay: true
        }
    }
    changemp3 = () => {
        let id = localStorage.getItem('songid')
        this.props.dispatch({
            type: 'home/getmusicurl',
            payload: id
        })
        this.props.dispatch({
            type: 'home/getmusicdetail',
            payload: id
        })
        this.props.dispatch({
            type: 'home/getmusicalbum',
            payload: id
        })
        this.props.dispatch({
            type: 'home/getsimisong',
            payload: id
        })
    }
    componentWillMount() {
        this.changemp3()
    }
    setmp3id = (id) => {
        localStorage.setItem('songid', id)
        this.changemp3()
    }
    player = () => {
        this.setState({
            isplay: !this.state.isplay
        })
        if (this.state.isplay) {
            this.refs.player.pause()
        } else {
            this.refs.player.play()
        }
    }
    back=()=>{
        this.props.history.go(-1)
    }
    render() {
        console.log(this.props);
        const { musicdetail, playdetail, hotcomments, simisonglist, singername } = this.props
            ;
        let icomurl = this.state.isplay ? require('../assets/icon/play.png') : require('../assets/icon/stop.png')
        let circlecls = this.state.isplay ? styles.musicpic : styles.musicpicnocircle
        return (

            <div>
                <div className={styles.musicbox}>
                    <br />
                    <img src={require('../assets/icon/back.png')} alt="" className={styles.backpic} onClick={()=>{this.back()}}/>
                    <h2>{musicdetail.name}</h2>
                    <h3>{singername}</h3>
                    <br />
                    <div className={styles.musicpicbox}>
                        <img src={icomurl} alt="" className={styles.iconpic} onClick={this.player} />
                        <img className={circlecls} src={musicdetail.picUrl} alt="" />
                    </div>
                </div>
                <br />
                <List renderHeader={() => '相似歌曲'} className="my-list">
                    {simisonglist.map(item =>
                        <Item key={item.id} extra={item.artists[0].name} onClick={() => { this.setmp3id(item.id) }}>{item.name}</Item>
                    )
                    }
                </List>
                <br />
                <div className={styles.commonbox}>
                    <h3>精彩评论</h3>
                    <br />
                    <ul>
                        {hotcomments.map((item) => {
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
                        })}
                    </ul>
                </div>

                <audio ref='player' src={playdetail} controls autoPlay className={styles.player}></audio>
            </div>
        )
    }
}
function mapstate2props(state) {
    return {
        musicdetail: state.home.musicdetail,
        playdetail: state.home.playdetail,
        hotcomments: state.home.musicalbum,
        simisonglist: state.home.simisonglist,
        singername: state.home.singername
    }
}
export default connect(mapstate2props)(MusicPlay)
