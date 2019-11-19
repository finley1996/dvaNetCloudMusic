import React from 'react';
import { connect } from 'dva'
import styles from './Musicplay.css'
import ListItem from 'antd-mobile/lib/list/ListItem';
import { Card, WhiteSpace, NavBar, Icon, List, NoticeBar, Popover, SearchBar, Slider, WingBlank } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
class MusicPlay extends React.Component {
    constructor() {
        super()
        this.state = {
            isplay: true,
            isshow: false,
            searchmusiclist:[]
        }
    }

    onSubmit= (value) => {
        if(!value){
            this.setState({
                searchmusiclist:[]
            })
        }else{
            fetch('/api/search?keywords='+value).then(body=>body.json()).then(res=>{
                console.log(res.result.songs)
                this.setState({
                    searchmusiclist:res.result.songs
                })
            })
        }
        
      };
    log = () => {
        return (value) => {
            let volume = value / 100
            this.refs.player.volume = volume
        };
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
        this.setState({
            isshow: false,
        })
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
    back = () => {
        this.props.history.go(-1)
    }
    ssshow = () => {
        this.setState({
            isshow: !this.state.isshow
        })
    }
    render() {
    
        console.log(this.props);
        const { musicdetail, playdetail, hotcomments, simisonglist, singername,songname } = this.props
            ;
        let icomurl = this.state.isplay ? require('../assets/icon/play.png') : require('../assets/icon/stop.png')
        let circlecls = this.state.isplay ? styles.musicpic : styles.musicpicnocircle
        let serachshow = this.state.isshow ? '' : styles.noshow
        return (

            <div>
                <div>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" onClick={() => { this.back() }} />}
                        //onLeftClick={() => console.log('onLeftClick')}
                        rightContent={[
                            <Icon key="0" type="search"  onClick={() => { this.ssshow() }} />
                        ]
                        }
                    >music player</NavBar>
                </div>
                <div className={serachshow}>
                    <SearchBar placeholder="Search" maxLength={8}  onSubmit={this.onSubmit}/>
                    <List renderHeader={() => 'search result'} className="my-list" style={{height:'150px',overflow:'auto'}}>
                        {/* <Item extra={'extra content'}>Title</Item> */}
                    {this.state.searchmusiclist.map(item=>(<Item key={item.id} extra={item.artists[0].name} onClick={() => { this.setmp3id(item.id) }} >{item.name}</Item>))}
                    </List>
                </div>
                <NoticeBar icon={null} marqueeProps={{ loop: true, style: { padding: '0 7.5px', color: '#2C3E50' } }}>
                    提示：相似歌曲点击可以播放哦！Similar songs can be played by clicking...
                </NoticeBar>
                <div className={styles.musicbox}>
                    <h2 style={{ fontSize: '28px', color: '#2C3E50', padding: '15px 5px 9px 5px', width:'100%',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{songname}</h2>
                    <h3 style={{ fontSize: '14px', color: '#b0c4de' }}>{singername}</h3>
                    <br />
                    <div className={styles.musicpicbox}>
                        <img src={icomurl} alt="" className={styles.iconpic} onClick={this.player} />
                        <img className={circlecls} src={musicdetail.picUrl} alt="" />
                    </div>
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <p className="sub-title">volume</p>
                        <WhiteSpace size="lg" />
                        <Slider
                            style={{ marginLeft: 30, marginRight: 30 }}
                            defaultValue={26}
                            min={0}
                            max={100}
                            onChange={this.log()}
                        //onAfterChange={this.log()}
                        />
                    </WingBlank>
                </div>
                <br />
                <List renderHeader={() => '相似歌曲'} className="my-list">
                    {simisonglist.map(item =>
                        <Item key={item.id} extra={item.artists[0].name} onClick={() => { this.setmp3id(item.id) }}>{item.name}</Item>
                    )
                    }
                </List>

                <div className={styles.commonbox}>
                    <h3 style={{ fontSize: '14px', color: '#888', boxSizing: 'border-box', padding: '15px 5px 9px 5px' }}>精彩评论</h3>

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
        singername: state.home.singername,
        songname:state.home.songname
    }
}
export default connect(mapstate2props)(MusicPlay)
