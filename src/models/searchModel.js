import * as api from "../services/index"
export default {
  namespace: "search",
  state: {
    musicList: [],
    hotList: []
  },
  reducers: {
    getList(state, payload) {
      let _state = JSON.parse(JSON.stringify(state))
      let list = payload.data.musicList;
      let temporaryList = []
      for (let i = 0; i < list.length; i++) {
        let obj = {}
        obj.musicName = list[i].name;
        obj.singer = list[i].artists[0].name;
        obj.id = list[i].id;
        temporaryList.push(obj)
      }
      let hash = {};
      temporaryList = temporaryList.reduce((preVal, curVal) => {
        hash[curVal.id] ? "" : hash[curVal.id] = true && preVal.push(curVal);
        return preVal
      }, [])
      _state.musicList = temporaryList;
      return _state
    },
    setHostList(state, payload) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.hotList = payload.data.hotList.hots
      return _state
    },
    clearSearList(state,payload){
      let _state = JSON.parse(JSON.stringify(state));
      _state.musicList=[];
      return _state;
    }
  },
  effects: {
    * getMusicAsync(payload, {
      put,
      call
    }) {
      /*  console.log(payload.value); */
      let res = yield call(api.search, payload.value);
      yield put({
        type: "getList",
        data: {
          musicList: res.data.result.songs
        }
      })
    },
    * getHotList(payload, {
      put,
      call
    }) {
      let res = yield call(api.getHotList);
      yield put({
        type: "setHostList",
        data: {
          hotList: res.data.result
        }
      })
    }
  }
}
