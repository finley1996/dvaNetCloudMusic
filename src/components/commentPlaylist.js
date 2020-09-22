import React from "react";
import { connect } from "dva";
import { Card, WhiteSpace } from "antd-mobile";

import style from "../assets/css/commentPlaylist.css";

class CommentPlayList extends React.Component {
  componentWillMount() {
    const id = this.props.id;
    // console.log("id",id)
    // console.log("comment",this.props)
    this.props.dispatch({
      type: "commentpl/getcommentpl",
      payload: id,
    });
  }
  render() {
    // console.log("12歌单id",this.props.id)
    console.log("getComment", this.props.hotComments);
    let comments = this.props.hotComments;
    return (
      <div>
        <WhiteSpace size="lg" />
        <h3 className={style.subtitle}>精彩评论</h3>
        {comments.map((item, index) => (
          <Card full key={index}>
            <Card.Header
              // title={}
              thumb={item.user.avatarUrl}
              thumbStyle={{
                width: "30px",
                height: "30px",
                borderRadius: "15px",
              }}
              extra={<span>{item.user.nickname}</span>}
            />
            <Card.Body>
              <div>{item.content}</div>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("11111", state.commentpl)
  return {
    hotComments: state.commentpl,
  };
};

export default connect(mapStateToProps)(CommentPlayList);
