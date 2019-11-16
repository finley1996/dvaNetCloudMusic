import React from "react"
import { connect } from "dva"
import { routerRedux } from "dva/router"

import styles from "../assets/css/playlist.css"
import CommentPlayList from "./commentPlaylist"

class PlayList extends React.Component {

  componentWillMount() {
    const id = localStorage.getItem('listid')
    this.props.dispatch({
      type: "playlist/getplist",
      payload: id
    })
  }
  getmusic(id, musicname) {
    this.props.dispatch({
      type: 'home/setmusicname',
      payload: musicname
    })
    // this.props.dispatch({
    //     type:'home/getmusicurl',
    //     payload:id
    // })
    localStorage.setItem('songid', id);
    this.props.dispatch(routerRedux.push({
      pathname: '/musicplay'
    }))
  }
  render() {
    let id = localStorage.getItem("listid")
    console.log("歌单id", id)
    // console.log(this.props,"plist___page")
    // console.log(this.props.plist,"000000")
    let songlist = this.props.plist;
    // console.log("$$$$$$$$$", songlist)
    // console.log("*******", songlist[0])
    return (
      <div>
        <div className={styles.info}>
          <h4>[VIP专享]一周新歌推荐</h4>
          <span>每周六更新</span>
          <p>每周VIP专享歌曲，编辑精选推荐。</p>
          <a>开启网易云音乐会员，即可畅享千万付费歌曲试听下载特权和无损音质。>
          </a>
        </div>
        <h3 className={styles.subtitle}>歌曲列表</h3>
        <div className={styles.plist}>
          {songlist.map((item, index) => <a key={item.id} className={styles.song} onClick={() => this.getmusic(item.id)}>
            <div className={styles.order}>{index}</div>
            <div className={styles.right}>
              <div className={styles.sinfo}>
                <div className={styles.sinfoName}>{item.name}</div>
                <div className={styles.sinfoDis}>{item.ar[0].name}</div>
              </div>
              <span className={styles.gn}>{' ▷'}</span>
            </div>
          </a>)}
        </div>
        <CommentPlayList id={id} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state.playlist, '121211')
  return {
    plist: state.playlist
  }
}

export default connect(mapStateToProps)(PlayList)