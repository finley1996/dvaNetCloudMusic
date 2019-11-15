import { effects } from "redux-saga";
import * as apis from '../services'
export default {
    namespace:'home',
    state:{
        recommend:[]
    },
    reducers:{
        setrecom(state,{payload}){
            console.log(payload)
            let _state = JSON.parse(JSON.stringify(state))
            _state.recommend = payload.playlists
            return _state
        }
    },
    effects:{
        *getrecomlist({payload},{call,put}){
          const res =  yield call(apis.recommend)
          
          yield put({
              type:'setrecom',
              payload:res.data
          })
        }
    }
}