import React from "react";
import styles from "../components/BoutiquePage.css";
import { connect } from "dva";
import { withRouter, routerRedux } from "dva/router";
class BoutiquePage extends React.Component {
  constructor() {
    super();
    this.state = {
      dataList: [],
    };
  }
  componentWillMount() {
    fetch("/api/dj/paygift?limit=5")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          dataList: data.data.list,
        })
      )
      .catch((e) => console.log("Oops, error", e));
  }
  exit = () => {
    console.log("退出");
    this.props.dispatch(routerRedux.go(-1));
  };
  toFineDetails = (id) => {
    console.log(id);
    localStorage.setItem("rid", id);
    this.props.dispatch(
      routerRedux.push({
        pathname: "/djcatelist/djs/details",
      })
    );
  };
  render() {
    console.log(this.state.dataList);
    let list = this.state.dataList;
    let ListToDom = list.map((item) => (
      <li
        key={item.id}
        onClick={() => {
          this.toFineDetails(item.id);
        }}
        className={styles.liInfo}
      >
        <div className={styles.img}>
          <img src={item.picUrl} className={styles.headPortrait} alt="" />
        </div>
        <div className={styles.rightInfo}>
          <p className={styles.headline}>{item.name}</p>
          <p className={styles.briefIntroduction}>{item.rcmdText}</p>
          <span className={styles.price}>￥{item.originalPrice / 100}</span>
        </div>
      </li>
    ));

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className={styles.Top}>
          <svg
            t="1574172693853"
            onClick={this.exit}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1911"
            width="32"
            height="32"
          >
            <path
              d="M682.424996 911.667585c-8.490372 0-17.041118-2.841721-24.091698-8.685823L199.142038 522.585079c-8.662287-7.185656-13.682627-17.853623-13.682627-29.112038s5.02034-21.926382 13.682627-29.111015L658.333298 83.941807c16.068977-13.325493 39.902802-11.06194 53.228295 4.995781 13.313214 16.081257 11.073196 39.901779-4.995781 53.228295L282.502607 493.473041 706.565812 844.756663c16.068977 13.326517 18.308995 37.147038 4.995781 53.228295C704.080202 907.004379 693.301717 911.667585 682.424996 911.667585z"
              p-id="1912"
            ></path>
          </svg>
          <span className={styles.span}>付费精品</span>
          <i></i>
        </div>
        <ul className={styles.BoutiqueList}>{ListToDom}</ul>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  /*  console.log(state.search.hotList); */
  return {
    musicList: state.search.musicList,
    hotList: state.search.hotList,
  };
};
export default connect(mapStateToProps)(BoutiquePage); //注入当前组件
