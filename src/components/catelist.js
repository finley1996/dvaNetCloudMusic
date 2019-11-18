import React from "react"
import { connect } from "dva"

import styles from "../assets/css/catelist.css"

class DJCateList extends React.Component {
  componentWillMount() {
    // console.log("djcatelist-component-props",this.props)
    this.props.dispatch({
      type: "catelist/getcatelist"
    })
  }
  render() {
    console.log("parops", this.props)
    let catelist = this.props.catelist
    console.log("catelsit", catelist)
    let hot = catelist.slice(0, 6)
    let more = catelist.slice(6)
    return (
      <div className={styles.cate}>
        <div className={styles.container}>
          <p className={styles.title}>热门分类</p>
          <ul className={styles.ul}>
            {hot.map((item, index) => <li key={index} className={styles.content}>
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
            {more.map((item, index) => <li key={index} className={styles.content}>
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