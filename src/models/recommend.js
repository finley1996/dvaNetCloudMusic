import { effects } from "redux-saga";
import * as apis from '../services'
export default {
    namespace:'home',
    state:{
        recommend:[],
        recommusic:[],
        musicname:'',
        playdetail:'',
        musicid:'',
        musicdetail:{},
        musicalbum:[] 
    },
    reducers:{
        setrecom(state,{payload}){
            let _state = JSON.parse(JSON.stringify(state))
            _state.recommend = payload.playlists
            return _state
        },
        setcommusic(state,{payload}){
            let _state = JSON.parse(JSON.stringify(state))     
            _state.recommusic = payload
            return _state
        },
        setmusicname(state,{payload}){
            let _state = JSON.parse(JSON.stringify(state))
            _state.musicname = payload
            return _state
        },
        setplaydetail(state,{payload}){
            let _state = JSON.parse(JSON.stringify(state))
            _state.playdetail = payload
            return _state
        },
        setmusicid(state,{payload}){
            let _state = JSON.parse(JSON.stringify(state))
            _state.musicid = payload
            return _state
        },
        setmusicdetill(state,{payload}){
            let _state = JSON.parse(JSON.stringify(state))
            _state.musicdetail = payload
            return _state
        },
        setmusicalbum(state,{payload}){
            let _state = JSON.parse(JSON.stringify(state))
            _state.musicalbum = payload
            return _state
        },
    },
    effects:{
        *getrecomlist({payload},{call,put}){
          const res =  yield call(apis.recommend)
          yield put({
              type:'setrecom',
              payload:res.data
          })
        },
        *getrecommusic({payload},{call,put}){
            const res =  yield call(apis.recommusic)
            
            yield put({
                type:'setcommusic',
                payload:res.data.result
            })
          },
          *getmusicurl({payload},{call,put}){
              const res = yield call(apis.musicurl,payload)              
              yield put({
                  type:'setplaydetail',
                  payload:res.data.data[0].url
              })
          },
          *getmusicdetail({payload},{call,put}){
              const res = yield call(apis.musicdetail,payload)
              yield put({
                  type:'setmusicdetill',
                  payload:res.data.songs[0].al
              })
          },
          //获取歌曲评论
          *getmusicalbum({payload},{call,put}){
              const res = yield call(apis.musicalbum,payload)
              yield put({
                  type:'setmusicalbum',
                  payload:res.data.hotComments
              })
          }
        
    }
}