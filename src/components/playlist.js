import React from "react"
import { connect } from "dva"
import { routerRedux } from "dva/router"

import styles from "../assets/css/playlist.css"
import CommentPlayList from "./commentPlaylist"
import PlayListInfo from "./playlistInfo"

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
    // console.log("歌单id", id)
    let songlist = this.props.plist;
    return (
      <div>
        <PlayListInfo id={id} />
        <h3 className={styles.subtitle}>歌曲列表</h3>
        <div>
          {songlist.map((item, index) => <a key={item.id} className={styles.song} onClick={() => this.getmusic(item.id)}>
            <div className={styles.order}>{index}</div>
            <div className={styles.right}>
              <div className={styles.sinfo}>
                <div className={styles.sinfoName}>{item.name}</div>
                <div className={styles.sinfoDis}>{item.ar[0].name}</div>
              </div>
              <div className={styles.gn}>
                <span>{' ▷'}</span>
              </div>
            </div>
          </a>)}
        </div>
        <h3 className={styles.subtitle}>精彩评论</h3>
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