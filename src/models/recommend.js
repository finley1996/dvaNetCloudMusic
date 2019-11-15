import { effects } from "redux-saga";
import * as apis from '../services'
export default {
    namespace:'home',
    state:{
        recommend:[]
    },
    reducers:{
        setrecom(state,action){
            console.log('run')
        }
    },
    effects:{
        *getrecomlist({payload},{call,put}){
          const res =  yield call(apis.recommend)
          console.log(res)
          yield put({
              type:'setrecom'
          })
        }
    }
}