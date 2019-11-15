import request from '../utils/request';
const pox = '/api'
export function query() {
  return request('/api/users');
}
// 获取每日推荐歌单

export function recommend(){
  return request(pox+'/top/playlist/highquality')
}
