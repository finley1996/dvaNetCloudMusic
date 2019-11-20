import { TabBar } from 'antd-mobile';
import React from 'react';
import { connect } from 'dva'

import Recommend from '../components/recommend'
import Listview from '../components/liveview'
import SearchPage from "../components/searchPage"
import RadioPage from "../components/radio"
import { routerRedux } from 'dva/router';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'recommend',
      hidden: false,
      fullScreen: true,
    };
  }

  componentDidMount() {
    this.props.dispatch(
      {
        type: 'home/getrecomlist'
      }
    )
  }
  jump = () => {
    // console.log(this.props, "home-detail")
    let id = 1997190595;
    // this.props.dispatch({
    //   type: "playlist/getplist",
    //   payload: id
    // })
    localStorage.setItem('listid', id)
    this.props.history.push('/playlist')
  }

  render() {
    return (
      <div>
        <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
          <TabBar
            unselectedTintColor="#d81e06"
            tintColor="#000000"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="好歌推荐"
              key="recommend"
              icon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(' + require('../assets/icon/music.png') + ') center center /  21px 21px no-repeat'
              }}
              />
              }
              selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: 'url(' + require('../assets/icon/music2.png') + ') center center /  21px 21px no-repeat'
              }}
              />
              }
              selected={this.state.selectedTab === 'recommend'}
              onPress={() => {
                this.setState({
                  selectedTab: 'recommend',
                });
              }}
              data-seed="logId"
            >
              {<Recommend />}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(' + require('../assets/icon/Top.png') + ') center center /  21px 21px no-repeat'
                }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(' + require('../assets/icon/Top2.png') + ') center center /  21px 21px no-repeat'
                }}
                />
              }
              title="排行榜"
              key="top"
              // badge={'new'}
              selected={this.state.selectedTab === 'top'}
              onPress={() => {
                this.setState({
                  selectedTab: 'top',
                });
              }}
              data-seed="logId1"
            >
              {2}
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(' + require('../assets/icon/search.png') + ') center center /  21px 21px no-repeat'
                }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(' + require('../assets/icon/search2.png') + ') center center /  21px 21px no-repeat'
                }}
                />
              }
              title="搜索"
              key="search"

              selected={this.state.selectedTab === 'search'}
              onPress={() => {
                this.setState({
                  selectedTab: 'search',
                });
              }}
            >
              <SearchPage></SearchPage>
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(' + require('../assets/icon/diantaizhibo.png') + ') center center /  21px 21px no-repeat'
                }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(' + require('../assets/icon/diantaizhibo1.png') + ') center center /  21px 21px no-repeat'
                }}
                />
              }
              title="电台推荐"
              key="dj"
              selected={this.state.selectedTab === 'dj'}
              onPress={() => {
                this.setState({
                  selectedTab: 'dj',
                });
              }}
            >
              <RadioPage></RadioPage>
            </TabBar.Item>
            <TabBar.Item
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(' + require('../assets/icon/MV.png') + ') center center /  21px 21px no-repeat'
                }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(' + require('../assets/icon/MV1.png') + ') center center /  21px 21px no-repeat'
                }}
                />
              }
              title="MV推荐"
              key="mv"
              selected={this.state.selectedTab === 'mv'}
              onPress={() => {
                this.setState({
                  selectedTab: 'mv',
                });
              }}
            >
              {<Listview />}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    );
  }
}

function mapstate2props(state) {
  return {
    playlist: state.home.recommend
  }
}

export default connect(mapstate2props)(Home)
