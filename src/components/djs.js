import React from "react"
import { connect } from "dva"
import { routerRedux } from "dva/router"
import styles from "../assets/css/djs.css"

class DJDetail extends React.Component {
  componentWillMount() {
    // console.log(this.props, "djdetil.porops")
    let type = localStorage.getItem("type")
    // console.log("ype",type)
    this.props.dispatch({
      type: "djs/getdjs",
      payload: type
    })
  }
  jump(rid) {
    console.log("rid----", rid)
    console.log(this.props)
    localStorage.setItem("rid",rid)
    this.props.dispatch(routerRedux.push({
      pathname: '/djcatelist/djs/details'
    }))
  }
  back(){
    this.props.dispatch(routerRedux.go(-1))
  }
  render() {
    let category = this.props.djs.category
    let data = this.props.djs.data
    // console.log("@-", this.props)
    return (
      <div className={styles.detail}>
        <div className={styles.header}>
          <span className={styles.back} onClick={()=>this.back()}>←</span>
          <span className={styles.title}>{category}</span>
        </div>
        <div className={styles.container}>
          {data.map((item, index) => <div key={index} className={styles.content} onClick={() => this.jump(item.id)}>
            <img src={item.picUrl} alt="" />
            <div className={styles.info}>
              <h3>{item.name}</h3>
              <p className={styles.summary}>{item.rcmdtext}</p>
              <p className={styles.pro}>节目：
                <span className={styles.pronum}>{item.programCount}</span>，
                <span className={styles.rnum}>{item.underShelf ? "最新上架" : "订阅：" + item.subCount}</span>
              </p>
              <p className={styles.price}>{item.buyed ? "￥" + item.price + "/期" : ""}</p>
            </div>
          </div>)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state, '121211')
  return {
    djs: state.djs
  }
}

export default connect(mapStateToProps)(DJDetail)