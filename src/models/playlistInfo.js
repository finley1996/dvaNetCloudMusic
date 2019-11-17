import * as apis from "../services"

export default {
  namespace: 'plinfo',
  state: {},
  reducers: {
    setplinfo(state, { payload }) {
      // console.log('qqqqqqqq',payload)
      state.name = payload.playlist.name;
      state.bg = payload.playlist.coverImgUrl;
      state.tags = payload.playlist.tags.join(" ")
      state.des = payload.playlist.description;
      // console.log("8@8282",payload.playlist.coverImgUrl)
      console.log(state,"-1-1-")
      let _state = JSON.parse(JSON.stringify(state))
      return _state
    }
  },
  effects: {
    *getplinfo({ payload }, { call, put }) {
      const res = yield call(apis.playlist, payload)
      yield put({
        type: "setplinfo",
        payload: res.data
      })
    }
  }
}