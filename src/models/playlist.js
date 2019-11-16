import { effects } from "redux-saga";
import * as apis from '../services'
// import queryString from "query-string"
export default {
    namespace: 'playlist',
    state: [],
    reducers: {
        setplist(state, { payload }) {
            // let _state = JSON.parse(JSON.stringify(state))
            // _state.plist = payload.playlist.tracks
            // //_state.plist = payload.playlist
            // console.log(_state,'setplist');
            
            // return _state
            // console.log(payload)
            state = payload.playlist.tracks
            // console.log(state)
            return state
        }
    },
    effects: {
        *getplist({ payload }, { call, put }) {
            const res = yield call(apis.playlist, payload)
            // console.log(res)
            yield put({
                type: 'setplist',
                payload: res.data
            })
        },
    },
    subscriptions:{
        // update({ dispatch, history }){
        //     history.listen((location)=>{
        //         console.log('=====0000',location)
        //         if(location.pathname=='/playlist'){
        //             let query = queryString.parse(location.search)
        //             dispatch({
        //                 type:'getplist',
        //                 payload:query.id
        //             })
        //         }
        //     })
        // }
    }

}