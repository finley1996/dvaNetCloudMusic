import React from "react"
import { connect } from "dva"
import { SearchBar, WhiteSpace, } from 'antd-mobile';
import styles from "./searchPage.css"
import { withRouter, routerRedux } from 'dva/router'
class SearchBarExample extends React.Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
            showCancelButton: true,
            value: "",
            arr: []
        }
    }
    clear = () => {
        this.setState({ 
            value: '', 
            arr: this.state.arr 
        });

    };
    componentWillMount() {
        this.props.dispatch({
            type: "search/getHotList"
        })
        if (localStorage.getItem("search_history") == undefined) {
            //如果没有，就为其设置站点，并初始化数组
            localStorage.setItem("search_history", "[]")
        }
        let history_arr = JSON.parse(localStorage.getItem("search_history"));
        // console.log(history_arr);
        this.setState({
            arr: history_arr,
        })

    }
    onChange = (e) => {
        this.setState({
            value: e
        })
    }
    search = (e) => {
        this.props.dispatch({
            type: "search/getMusicAsync",
            value: e
        })
        //1.检测当前站点是否有search_history
        if (localStorage.getItem("search_history") == undefined) {
            //如果没有，就为其设置站点，并初始化数组
            localStorage.setItem("search_history", "[]")
        }
        //2..将localStorage中的search_history取出并用数组接收
        let search_history_arr = JSON.parse(localStorage.getItem("search_history"));
        //3.将数据存入数组
        search_history_arr.push(e)
        search_history_arr=Array.from(new Set(search_history_arr))//历史记录去重
        //4.将存数据的数组（search_history_arr）重新转换成字符串并放入localStorage中
        localStorage.setItem("search_history", JSON.stringify(search_history_arr));
        this.setState({
            isShow: true,
            arr:search_history_arr
        })
    }
    cancel = () => {
        this.setState({
            isShow: false
        })
        
    }
    mark = (first) => {
        this.props.dispatch({
            type: "search/getMusicAsync",
            value: first
        })
        this.setState({
            isShow: true,
            value: first,
        })
    }
    playBtn = (id) => {
        // console.log(id);
        window.localStorage.setItem("songid", id)
        this.props.dispatch(routerRedux.push({
            pathname: '/musicplay'
        }))
    }
    delHistoryList = (index) => {
        // console.log(index);
        let search_history_arr = JSON.parse(localStorage.getItem("search_history"));
        search_history_arr.splice(index, 1)
        localStorage.setItem("search_history", JSON.stringify(search_history_arr));
        this.setState({
            arr: search_history_arr,
        })

    }
    historyToSearch=(value)=>{
        this.props.dispatch({
            type: "search/getMusicAsync",
            value: value
        })
        this.setState({
            isShow: true,
            value: value,
        })
    }
    render() {
        /*  console.log(this.state.historyList); */
        /* 历史记录 */
        let arr = this.state.arr.map((item, index) => <li
            className={styles.historyList}
            key={index}>
                 <svg t="1573983937650" className={styles.history_clock_icon} 
            viewBox="0 0 1024 1024" 
            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3340" width="20" height="20"><path d="M839.104 192.96A460.48 460.48 0 0 0 511.488 57.216a460.352 460.352 0 0 0-327.68 135.744 460.352 460.352 0 0 0-135.744 327.68c0 90.176 25.92 177.6 74.944 252.8a32.192 32.192 0 1 0 53.952-35.2 397.824 397.824 0 0 1-64.512-217.6A399.36 399.36 0 0 1 511.36 121.792c219.968 0 398.848 178.944 398.848 398.848s-178.944 398.848-398.848 398.848a398.08 398.08 0 0 1-206.08-57.28 32.256 32.256 0 0 0-33.408 55.168 462.208 462.208 0 0 0 239.424 66.56 460.288 460.288 0 0 0 327.616-135.68c87.488-87.552 135.744-203.968 135.744-327.68s-48-240.064-135.552-327.616z m-345.472 10.496a40.768 40.768 0 0 0-40.768 40.832v293.504c0 1.408 0.384 2.816 0.512 4.16a40.32 40.32 0 0 0 40.768 35.84l0.128-0.896h231.488a40.832 40.832 0 1 0 0-81.6H534.464V244.288a40.832 40.832 0 0 0-40.832-40.832z m0 0" p-id="3341" fill="#bfbfbf" ></path></svg>
            <a href="#" 
             className={styles.clock_history_box}
            onClick={() => { this.historyToSearch(item) }}>
              <span>{item}</span>
            </a>
            <span onClick={() => { this.delHistoryList(index) }}>
            <svg t="1574047828344" className={styles.delBtn} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4132" width="16" height="16"><path d="M897.969231 842.830769L567.138462 512l330.830769-330.830769-55.138462-55.138462-330.830769 330.830769-330.830769-330.830769-55.138462 55.138462 330.830769 330.830769-330.830769 330.830769 55.138462 55.138462 330.830769-330.830769 330.830769 330.830769z" fill="#8a8a8a" p-id="4133"></path></svg>
            </span>
        </li>)
        //热搜部分
        let hotList = this.props.hotList.map((item, index) =>
            <a href="#" key={index}
                className={styles.a_hotList}
                onClick={() => { this.mark(item.first) }}>
                {item.first}
            </a>)
        //搜索部分
        let list = this.props.musicList.map(item =>
            <li key={item.id} className={styles.searchList}>
                <div className={styles.a_box}>
                    <div className="left">
                        <div>
                            <p className={styles.musicName}
                            >{item.musicName}</p>
                        </div>
                        <div>
                            <p className={styles.singer}
                            >
                                <span>SQ</span>
                                {item.singer}
                            </p>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <span className={styles.playBtn}
                            onClick={() => { this.playBtn(item.id) }}
                        >
                            <svg t="1574047384661" className={styles.playBtn} viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2134" width="16" height="16"><path d="M512 42.667008C254.733312 42.667008 42.665984 254.736384 42.665984 512s212.067328 469.331968 469.331968 469.331968c257.26464 0 469.334016-212.067328 469.334016-469.331968 0-257.26464-212.069376-469.334016-469.334016-469.334016M512 1024C228.692992 1024 0 795.307008 0 512 0 228.692992 228.692992 0 512 0c283.307008 0 512 228.692992 512 512 0 283.307008-228.692992 512-512 512" p-id="2135" fill="#888"></path><path d="M631.883776 496.1024c10.61888 7.949312 10.61888 23.846912 0 31.7952L405.23776 678.93248C394.61888 686.880768 384 681.582592 384 668.33408V355.667968c0-13.249536 10.619904-18.548736 21.23776-10.600448l226.646016 151.03488z" p-id="2136" fill="#888"></path></svg>
                        </span>
                    </div>
                </div>
            </li>);
        return (
            <div>
                {/* //搜索 */}
                <SearchBar placeholder="搜索歌曲,歌手,专辑" maxLength={8} onSubmit={this.search} onClear={this.cancel} value={this.state.value} onChange={this.onChange} className={styles.searchText}  style={{borderRadius:"10px"}}/>
                <WhiteSpace />
             
                {/* 搜索结果列表 */}
                <div className="musicList">
                    <ul className={styles.musicList}
                    >{this.state.isShow ? list : ""}</ul>
                </div>
                {/* 热搜列表 */}
                <div className={styles.SearchBox}>
                    {this.state.isShow ? "" : <p>热门搜索</p>}
                    <ul className={styles.hotList}>
                        {this.state.isShow ? "" : hotList}
                    </ul>
                </div>
                {/* 历史记录 */}
                <div>
                    <ul>
                    {this.state.isShow ? "" : arr}
                    </ul>
                </div>
            </div>);
    }
}
const mapStateToProps = state => {
    /*  console.log(state.search.hotList); */
    return {
        musicList: state.search.musicList,
        hotList: state.search.hotList
    }
}
export default connect(mapStateToProps)(SearchBarExample)//注入当前组件