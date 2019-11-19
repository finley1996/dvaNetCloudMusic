import request from '../utils/request';

const pox = '/api'
export function query() {
  return request('/api/users');
}
// 获取每日推荐歌单
export function recommend(){
  return request(pox+'/top/playlist/highquality?limit=6')
}
//精准搜索
export function search(value){
  //return request(pox+`/search`,options)
   return request(pox+`/search?keywords=`+value)
}
//热门搜索
export function getHotList(){
  //return request(pox+`/search`,options)
   return request(pox+"/search/hot")
}
// 获取推荐音乐
export function recommusic(){
  return request(pox+'/personalized/newsong')
}
// 获取音乐url
export function musicurl(id){
  return request(pox+'/song/url?id='+id)
}
// 获取音乐详情
export function musicdetail(id){
  return request(pox+'/song/detail?ids='+id)
}
// 获取歌曲评论
export function musicalbum(id){
  return request(pox+'/comment/music?id='+id)
}
//获取电台
export function getRadioList(){
  return request(pox+'/dj/hot')
}
//获取精品
export function getProducts_recommended(){
  return request(pox+'/dj/paygift?limit=3')
}
//获取电台分类
export function getRadioType(){
  return request(pox+'/dj/catelist')
}
//获取电台分类详情
export function getRadioDetails(type){
  return request(pox+'/dj/recommend/type?type='+type)
}
// 获取精品mv
export function mvlist(){
  return request(pox+'/top/mv?limit=10')
}
// 获取相似音乐
export function simisong(id){
  return request(pox+'/simi/song?id='+id)
}
//获取歌单
export function playlist(id) {
  return request(pox + '/playlist/detail?id=' + id)
}
//获取歌单精彩评论
export function commentPlaylist(id) {
  return request(pox + '/comment/playlist?id=' + id)
}
//获取单个电台对应详情
export function djDetails(rid) {
  return request(pox + "/dj/detail?rid=" + rid)
}
//获取单个电台的对应节目
export function djprogram(rid) {
  return request(pox + "/dj/program?rid=" + rid)
}