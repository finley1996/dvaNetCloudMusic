import React from "react"
import { connect } from "dva"
import { routerRedux } from "dva/router"
import { NavBar, Icon } from 'antd-mobile';

import styles from "../assets/css/catelist.css"

class DJCateList extends React.Component {
  componentWillMount() {
    // console.log("djcatelist-component-props",this.props)
    this.props.dispatch({
      type: "catelist/getcatelist"
    })
  }
  jump(type) {
    localStorage.setItem("type", type)
    console.log("this---", this.props)
    // this.props.type = type
    this.props.dispatch(routerRedux.push({
      pathname: '/djcatelist/djs'
    }))
  }
  back(){
    this.props.dispatch(routerRedux.go(-1))
  }
  render() {
    console.log("parops", this.props)
    let catelist = this.props.catelist
    // console.log("catelsit", catelist)
    let hot = catelist.slice(0, 6)
    let more = catelist.slice(6)
    return (
      <div className={styles.cate}>
        <div className={styles.container}>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.back()}
          >热门分类</NavBar>
          {/* <p className={styles.title}>热门分类</p> */}
          <ul className={styles.ul}>
            {hot.map((item, index) => <li key={index} className={styles.content} onClick={() => this.jump(item.id)}>
              <div className={styles.block}>
                <img src={item.pic56x56Url} alt="" />
                <span>{item.name}</span>
              </div>
            </li>)}
          </ul>
        </div>
        <div className={styles.container}>
          <p className={styles.title}>更多分类</p>
          <ul className={styles.ul}>
            {more.map((item, index) => <li key={index} className={styles.content} onClick={() => this.jump(item.id)}>
              <div className={styles.block}>
                <img src={item.pic56x56Url} alt="" />
                <span>{item.name}</span>
              </div>
            </li>)}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    catelist: state.catelist
  }
}

export default connect(mapStateToProps)(DJCateList)