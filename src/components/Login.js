import React from "react"
import {Fragment} from "react"
import loginStyle from "./Login.model.css"
import { connect } from "dva"
import { withRouter, routerRedux } from 'dva/router'
import { getLogin } from "../services/example"
import { relative } from "path"

class Login extends React.Component{
    getphone(e){
        if(e.target.value==""){
            alert("手机号不能为空")
        }else{
            let reg = /^1(3|4|5|7|8)\d{9}$/
            let flage =  reg.test(e.target.value)
            if(!flage){
                alert("手机号格式不正确")
            }
            localStorage.setItem("phone",e.target.value)
        }
    }
    getpassword(e){
        if(e.target.value==""){
            alert("密码不能为空")   
        }else{
            localStorage.setItem("password",e.target.value)
        }
    }
    login=()=>{
        console.log(this.props)
        let _this = this
        let phone = window.localStorage.getItem("phone")
        let password = window.localStorage.getItem("password")
        fetch(`/api/login/cellphone?phone=`+phone+`&password=`+password).then(response => response.json())
        .then(data => {
            if(data.code==200){
              _this.refs['inputRef'].value = ""
              _this.refs['inputReff'].value = ""
                _this.props.dispatch(routerRedux.push({
                    pathname: '/'
                }))
            }
        })
        .catch(e => console.log("Oops, error", e))
    }

    render(){
        return(
            <div className={loginStyle.container}>
                {/* <div className={loginStyle.images}></div> */}
            <div className={loginStyle.box}>
                <div>
                <span className={loginStyle.span}>☏</span>
                 <input type="text" className={loginStyle.input} placeholder="+86 请输入手机号" onBlur={this.getphone} ref={'inputReff'}/><br/>
                </div>
                <div>
                <span className={loginStyle.span}>⊙</span>
                 <input type="password" className={loginStyle.input} placeholder="请输入密码" onBlur={this.getpassword} ref={'inputRef'}/>
                </div>
                <button onClick={this.login} className={loginStyle.button}>登录</button> 
            </div>
            </div>
        )
    }
}

const mapLoginDtata = state=>{
    return {
        loginData:state
    }
}

export default connect()(Login)