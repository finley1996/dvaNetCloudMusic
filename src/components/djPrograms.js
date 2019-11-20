import React from "react"
import { connect } from "dva"
import styles from "../assets/css/djPrograms.css"

class DJPrograms extends React.Component {
  componentWillMount() {
    // console.log("******************",this.props)
    let rid = localStorage.getItem("rid")
    // console.log("--- rid ---", rid)
    this.props.dispatch({
      type: "djprograms/getdjprograms",
      payload: rid
    })
  }
  render() {
    // console.log("&&&&&&", this.props)
    console.log("###",this.props.djprograms)
    let djprograms = this.props.djprograms
    return (
      <div className={styles.progarm}>
        <h4 style={{lineHeight:"30px"}}>节目列表</h4>
        {djprograms.map((item, index) => <p key={index}>
          <span>{index+1}</span> {item}
        </p>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    djprograms: state.djprograms
  }
}

export default connect(mapStateToProps)(DJPrograms)