import request from '../utils/request';

const pox = '/api'
export function query() {
  return request('/api/users');
}

//获取排行榜详情
var id = window.localStorage.getItem('songid')
export function getToplist(id) {
  return request(pox+`/top/list?idx=`+id);
}

//获取排行榜分类
export function getTotalList() {
  return request(pox+'/toplist/detail');
}

//获取登录接口数据
// var phone = window.localStorage.getItem("phone")
// var password = window.localStorage.getItem("password")
// console.log(phone)
// console.log(password)
export function getLogin(phone,password) {
  return  request(pox+`/login/cellphone?phone=`+phone+`&password=`+password);
}
