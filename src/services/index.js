import request from '../utils/request';

const pox = '/api'
export function query() {
  return request('/api/users');
}
// 获取每日推荐歌单

export function recommend(){
  return request(pox+'/top/playlist/highquality?limit=6')
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