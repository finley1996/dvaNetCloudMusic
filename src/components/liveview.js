/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from "react"
import { ListView, PullToRefresh } from 'antd-mobile';

//这是个容器 包裹了listView
function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    //定义数据源 ListView diff算法
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      refreshing: true,//如果为true 那么会触发刷新动画
      dataSource,
      isLoading: true,
      height: document.documentElement.clientHeight,//设置listView的高度
      refreshing: true
    };
  }
  //页面加载的时候 将数据传入dataSource
  componentDidMount() {
    this.setState({
      isLoading: true
    })
    //请求服务器参数 将获取到的新数据(数组类型) 传入到dataSource.cloneWithRows()
    fetch("/api/top/mv")
      .then(body => body.json())
      .then(res => {
        console.log(res.data);
        
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.data),
          isLoading: false
        })
      })
  }
  onEndReached = (event) => {
    this.setState({
      isLoading: false
    })
  }
  //下拉刷新的事件处理函数
  onRefresh() {
    //fetch是ES6里面原生的基于promise的HTTP语法
    fetch("/api/top/mv")
      .then(body => body.json())
      .then(res => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(res.data),
          refreshing: false
        })
      })
  }
  render() {
    const row = (rowData, sectionID, rowID) => {
      
      //rowData就是数据源里面的每一项{}
      return (
        //每一行内容的结构 可以根据自己的需求更改样式
        <div key={rowID} style={{ padding: '0 15px' }}>
          <div
            style={{
              lineHeight: '50px',
              color: '#888',
              fontSize: 18,
              borderBottom: '1px solid #F6F6F6',
            }}
          >{rowData.artistName}</div>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{rowData.name}</div>
              <div><img src={rowData.cover} alt="" style={{width:'100%',height:'200px'}}/></div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <ListView
        //initialListSize={5} //初始渲染几个 必须保证占满元素的高度
        ref={el => this.lv = el}
        dataSource={this.state.dataSource} //数据源
        renderHeader={() => <h2>MV推荐</h2>}//顶部渲染的结构
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '正在加载...' : '加载完毕'}
        </div>)}//底部渲染的结构
        renderBodyComponent={() => <MyBody />}
        renderRow={row} //渲染listView里面的每一行的结构
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        pageSize={1}
        onScroll={() => { console.log('scroll'); }}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}//只要refreshing属性值为true那么就会有刷新动画
          onRefresh={this.onRefresh.bind(this)}//下拉的时候触发的事件
        />}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached} //数据全部渲染完毕之后触发的方法
        onEndReachedThreshold={10}
      />
    );
  }
}

export default Demo