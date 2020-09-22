import React from "react";
import { connect } from "dva";
import styles from "../assets/css/djDetails.css";
import { routerRedux } from "dva/router";
import DJPrograms from "../components/djPrograms";

class DJDetails extends React.Component {
  componentWillMount() {
    // console.log("props---- ", this.props)
    let rid = localStorage.getItem("rid");
    this.props.dispatch({
      type: "djdetails/getdjdetails",
      payload: rid,
    });
  }
  back() {
    this.props.dispatch(routerRedux.go(-1));
  }
  render() {
    // console.log("###", this.props)t
    let details = this.props.djdetails;
    // console.log("details!!!!!!!!!", details)
    const comment = (
      <div className={styles.comment}>
        <h4>精彩评论</h4>
        <ul>
          {details.commentDatas.map((item, index) => (
            <li key={index}>
              <div>
                <h3>
                  <img src={item.avatarUrl} alt="" />
                  {item.nickname}
                </h3>
                <div className={styles.comment_body}>
                  <p>{item.content}</p>
                  <h4>——{item.programName}</h4>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );

    const detail = (
      <div className={styles.show}>
        <div className={styles.content}>
          <h5>电台内容简介</h5>
          <div>
            分类：<span>{details.category}</span>
          </div>
          <div>{details.desc}</div>
        </div>
      </div>
    );

    return (
      <div className={styles.details}>
        <h3 className={styles.header}>
          <span className={styles.back} onClick={() => this.back()}>
            ←
          </span>
          电台
        </h3>
        <div
          className={styles.top}
          style={{ backgroundImage: `url(${details.picUrl})` }}
        >
          <div className={styles.topinfo}>
            <p className={styles.topinfo_left}>
              <span>{details.name}</span>
              <span>{details.subCount}人已订阅</span>
            </p>
            <p className={styles.topinfo_right}>
              <span>☆ &nbsp; 订阅</span>
            </p>
          </div>
        </div>
        <div className={styles.bottom}>
          <ul className={styles.bottom_tab}>
            <li>
              <b>详情</b>
            </li>
            <li>
              <b>节目</b>
              <span>{details.programCount}</span>
            </li>
          </ul>
          {/* 电台内容简介 */}
          {detail}
          {/* 节目列表 */}
          <DJPrograms />
          {/* 精彩评论 */}
          {details.commentDatas.length ? comment : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("djdetails_component_state----", state)
  return {
    djdetails: state.djdetails,
  };
};

export default connect(mapStateToProps)(DJDetails);
