import { TabBar } from 'antd-mobile';
import React from 'react';
import { connect } from 'dva'
import { Router, Route, Switch, withRouter ,routerRedux } from 'dva/router';
import Recommend from '../components/recommend'
import Listview from '../components/liveview'
import SearchPage from "../components/searchPage"
import RadioPage from "../components/radio"
import searchPage from '../components/searchPage';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '/recommend',
      hidden: false,
      fullScreen: true,
    };
  }
componentWillMount(){
  this.setState({
    selectedTab:this.props.history.location.pathname
  })
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
              selected={this.state.selectedTab === '/'}
              onPress={() => {
                 this.props.history.push("/")
                this.setState({
                  selectedTab: '/',
                });
              }}
              data-seed="logId"
            >
              <Route path="/" exact component={Recommend} />
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
              selected={this.state.selectedTab === '/top'}
              onPress={() => {
                //  this.props.history.push("recommend")
                this.props.dispatch(routerRedux.push({
                  pathname: '/recommend'
                }))
                this.setState({
                  selectedTab: '/top',
                });
              }}
              data-seed="logId1"
            >
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

              selected={this.state.selectedTab === '/search'}
              onPress={() => {
                //this.props.history.push("search")
                this.setState({
                  selectedTab: '/search',
                });
              }}
            >
              <SearchPage/>
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
              selected={this.state.selectedTab === '/dj'}
              onPress={() => {
                this.props.history.push("dj")
                this.setState({
                  selectedTab: '/dj',
                });
              }}
            >
              <Route path="/dj"  exact component={RadioPage} />
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
              selected={this.state.selectedTab === '/mv'}
              onPress={() => {
                
                 this.props.history.push("mv")
                this.setState({
                  selectedTab: '/mv',
                });
              }}
            >
              <Route path="/mv" exact component={Listview} />
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    );
  }
}


export default withRouter(connect()(Home)) 
