import { TabBar } from 'antd-mobile';
import React from 'react';
import { connect } from 'dva'
import Recommend from '../components/recommend'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'recommend',
      hidden: false,
      fullScreen: true,
    };
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
              {3}
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    );
  }
}


export default connect()(Home)
