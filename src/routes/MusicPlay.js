import React from 'react';
import { connect } from 'dva'
import styles from './Musicplay.css'
import ListItem from 'antd-mobile/lib/list/ListItem';
import { Card, WhiteSpace } from 'antd-mobile';
class MusicPlay extends React.Component {
    constructor() {
        super()
        this.state = {
            isplay: true
        }
    }
    componentWillMount() {
        const id = localStorage.getItem('songid')
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

    }
    player = () => {
        this.setState({
            isplay: !this.state.isplay
        })
        console.log(this.refs)
        if (this.state.isplay) {
            this.refs.player.pause()
        } else {
            this.refs.player.play()
        }
    }
    render() {
        console.log(this.props);
        const { musicdetail, playdetail, hotcomments } = this.props
            ;
        let icomurl = this.state.isplay ? require('../assets/icon/play.png') : require('../assets/icon/stop.png')
        let circlecls = this.state.isplay ? styles.musicpic : styles.musicpicnocircle
        return (

            <div>
                <div className={styles.musicbox}>
                    <br />
                    <h2>{musicdetail.name}</h2>
                    <br />
                    <div className={styles.musicpicbox}>
                        <img src={icomurl} alt="" className={styles.iconpic} onClick={this.player} />
                        <img className={circlecls} src={musicdetail.picUrl} alt="" />
                    </div>

                </div>
                <br />
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
        hotcomments: state.home.musicalbum
    }
}
export default connect(mapstate2props)(MusicPlay)
