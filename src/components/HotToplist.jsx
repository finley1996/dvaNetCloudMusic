import React from "react"
import { connect } from "dva"
// import { getToplist } from "../services/example"
import  listStyle from "./HotTopList.model.css"
import { withRouter, routerRedux } from 'dva/router'
class HotToplist extends React.Component {
    componentWillMount() {
        let id = window.localStorage.getItem("listid")
        this.props.dispatch({
            type: "toplist/feact",
            payload:id
        })
    }
    handel=(id)=>{
       window.localStorage.setItem("songid",id)
       this.props.dispatch(routerRedux.push({
        pathname: '/musicplay'
    }))
    }
    back() {
        this.props.dispatch(routerRedux.go(-1))
      }
    render() {
        // console.log(this.props)
        const list = this.props.toplist.toplist
        // console.log(this.props.toplist.imgUrl)
        const imgUrl = this.props.toplist.imgUrl
        //  console.log(list)
        return (
            <div className={listStyle.box}>
                <img src={imgUrl} className={listStyle.img}/>
                <span className={listStyle.back} onClick={() => this.back()}>?</span>
              <ul className={listStyle.ul}>
                  {list.map((item,index)=>{ 
                      if(index>30){return}
                      return <li key={index} className={listStyle.li} onClick={()=>{this.handel(item.id)}}> 
                         <b className={listStyle.b}>{index+1<10?("0"+(index+1)):(index+1)}</b>
                         <span className={listStyle.title}>{item.name}</span><br/>
                         {/* <span className={listStyle.sq}>SQ</span> */}
                         <i className={listStyle.i,listStyle.ii}>{item.ar[0].name}-</i>
                         <i className={listStyle.i}>{item.al.name}</i>
                         <button className={listStyle.btn} >?</button>
                  </li>}
                  )}      
              </ul>
            </div>
        )
    }
}

const maptoprops = state => {
    // console.log(state.toplist)
    return {
        toplist: state.toplist
    }

}


export default connect(maptoprops)(HotToplist)
