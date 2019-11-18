import React from "react"
import { connect } from "dva"
import styles from "../assets/css/playlistInfo.css"

class PlayListInfo extends React.Component {
  componentWillMount() {
    const id = this.props.id;
    this.props.dispatch({
      type: "plinfo/getplinfo",
      payload: id
    })
  }
  content = (e) => {
    //改变状态
    this.props.dispatch({
      type: "plinfo/setstutas"
    })
    let status = this.props.plinfo.isShow
    let condiv = e.target
    if (status) {
      condiv.style.height = "auto"
    } else {
      condiv.style.height = "60px"
    }
  }
  show = (e) => {
    this.props.dispatch({
      type: "plinfo/setstutas"
    })
    let status = this.props.plinfo.isShow
    let showdiv = e.target
    //获取showdiv的上一个兄弟元素
    let condiv = showdiv.previousSibling
    if (status) {
      condiv.style.height = "auto"
    } else {
      condiv.style.height = "60px"
    }
  }
  render() {
    let obj = this.props.plinfo
    // console.log(this.props,"------------------")
    return (
      <div className={styles.container}>
        <div className={styles.info}>
          <img src={obj.bg} alt="" />
          <h2>{obj.name}</h2>
        </div>
        <div className={styles.instruction}>
          <div className={styles.tags}>标签：{obj.tags.map((item, index) => <span key={index}>{item}</span>)}</div>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: obj.des }} onClick={this.content}>
          </div>
          <div className={styles.show} onClick={this.show}>更多</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state, '121211')
  return {
    plinfo: state.plinfo
  }
}

export default connect(mapStateToProps)(PlayListInfo)