import { effects } from "redux-saga"
import * as apis from "../services/example"


export default {
  namespace: 'toplist',
  state: {  
      toplist:[],
      tophome:[]
  },
  reducers: {
      settoplist(state, {payload}) {
          let _state = JSON.parse(JSON.stringify(state))
          _state.toplist = payload.playlist.tracks
          _state.imgUrl = payload.playlist.coverImgUrl
          return _state
        },
        settotallist(state,{payload}){
          let oldarr = []
          for(let i=0;i<payload.list.length;i++){
            if(payload.list[i].tracks.length){
              let obj = {
                imgUrl:payload.list[i].coverImgUrl,
                id:payload.list[i].id,
                name:payload.list[i].name,
                time:payload.list[i].updateFrequency,
                data:payload.list[i].tracks
              }
              oldarr.push(obj)
            }
          }
          // console.log(oldarr)
          let _state = JSON.parse(JSON.stringify(state))
          _state.tophome = oldarr
          return _state
        }
  },
  effects: {
     *feact( {payload}, { call, put }) {
      const res =  yield call(apis.getToplist,payload)
          yield put({ 
            type: 'settoplist',
            payload:res.data
           });
      },
     *hometop( {payload}, { call, put }) { 
      const res =  yield call(apis.getTotalList,payload)
          yield put({ 
            type: 'settotallist',
            payload:res.data
           });
      },
    },
}