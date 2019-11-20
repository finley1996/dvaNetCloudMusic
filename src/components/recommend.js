import React from 'react'
import { connect } from 'dva'
import styles from './recommend.css'
import Lunbotu from './lunbotu'
import { Card, WhiteSpace } from 'antd-mobile';
import { withRouter, routerRedux } from 'dva/router'
import { Grid } from 'antd-mobile';
class Recommend extends React.Component {

    componentDidMount() {
        this.props.dispatch(
            {
                type: 'home/getrecomlist'
            }
        )
        this.props.dispatch(
            {
                type: 'home/getrecommusic'
            }
        )
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
    //跳转到歌单列表页面
    jump(id) {
        localStorage.setItem('listid', id)
        // this.props.history.push('/playlist')
        this.props.dispatch(routerRedux.push({
            pathname: '/playlist'
        }))
    }
    render() {

        const { playlist, musiclist } = this.props
        const data1 = playlist.map((item) => ({
            id: item.id,
            icon: item.coverImgUrl,
            dec:item.copywriter
          }));
          
        return (
            <div className={styles.container}>
                <Lunbotu />
                <br />
                <div>
                    <h3 style={{fontSize: '14px',color: '#888',boxSizing: 'border-box',padding: '15px 5px 9px 5px'}}>推荐歌单</h3>
                    {/* <ul className={styles.playlist}>
                        {playlist.map(item=>{
                            return (
                                <li className={styles.palyli} key={item.id} >
                                    <img src={item.coverImgUrl} />
                                    <span>{item.name}</span>
                                </li>
                            )
                        })}
                    </ul> */}
                    <Grid data={data1}
                        columnNum={3}
                        renderItem={dataItem => (
                            <div style={{ padding: '1px' }}  onClick={() => this.jump(dataItem.id)}>
                                <img src={dataItem.icon} style={{ width: '90px', height: '90px' }} alt="" />
                                <div style={{ color: '#888', fontSize: '10px'}}>
                                <span>{dataItem.dec}</span>
                                </div>
                            </div>
                        )}
                    />
                </div>
                <br/>
                <div>
                    <h3 style={{fontSize: '14px',color: '#888',boxSizing: 'border-box',padding: '15px 5px 9px 5px'}}>推荐音乐</h3>
                    <ul>
                        {musiclist.map(item => {
                            return (
                                <div key={item.id} onClick={()=>this.getmusic(item.id)}>
                                    <WhiteSpace size="lg" />
                                    <Card full>
                                        <Card.Header

                                            thumb={item.song.album.picUrl}
                                            extra={<span>{item.name}</span>}
                                        />
                                        <Card.Body>
                                            <div>{item.song.album.artists[0].name}</div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}
function mapstate2props(state) {
    return {
        playlist: state.home.recommend,
        musiclist: state.home.recommusic
    }
}

export default connect(mapstate2props)(Recommend)