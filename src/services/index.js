import request from '../utils/request';
const pox = '/api'
export function query() {
  return request('/api/users');
}
// 获取每日推荐歌单

export function recommend() {
  return request(pox + '/top/playlist/highquality?limit=6')
}

//获取歌单
export function playlist(id) {
  return request(pox + '/playlist/detail?id=' + id)
}

//获取歌单精彩评论
export function commentPlaylist(id) {
  return request(pox + '/comment/playlist?id=' + id)
}