import React from "react"
import { connect } from "dva"
import { Card, WhiteSpace } from "antd-mobile"

class CommentPlayList extends React.Component {
  componentWillMount() {
    const id = this.props.id;
    // console.log("id",id)
    // console.log("comment",this.props)
    this.props.dispatch({
      type: "commentpl/getcommentpl",
      payload: id
    })
  }
  render() {
    // console.log("12歌单id",this.props.id)
    // console.log("getComment", this.props.hotComments)
    let comments = this.props.hotComments
    return (
      <div>
        <WhiteSpace size="" />
        {comments.map((item, index) => <Card full key={index}>
          <Card.Header
            thumb={item.user.avatarUrl}
            thumbStyle={{ width: "30px", height: "30px", borderRadius: "15px" }}
            extra={<span>{item.user.nickname}</span>}
          />
          <Card.Body>
            <div>{item.content}</div>
          </Card.Body>
        </Card>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("11111", state.commentpl)
  return {
    hotComments: state.commentpl
  }
}

export default connect(mapStateToProps)(CommentPlayList)