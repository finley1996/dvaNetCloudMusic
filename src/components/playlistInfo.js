import React from "react"
import { connect } from "dva"
import style from "../assets/css/playlistInfo.css"

class PlayListInfo extends React.Component {
  componentWillMount() {
    // console.log("indfo", this.props.id)
    const id = this.props.id;
    this.props.dispatch({
      type: "plinfo/getplinfo",
      payload: id
    })
  }
  render() {
    // console.log(this.props, "^^^^^^^^^^^^^^^^")
    let obj = this.props.plinfo
    // console.log("obj--------", obj)
    return (
      <div className={style.container}>
        <div className={style.info}>
          <img src={obj.bg} alt="" />
          <h2>{obj.name}</h2>
          <h3>简介：{obj.tags}</h3>
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