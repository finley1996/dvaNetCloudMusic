import * as apis from '../services'

export default {
  namespace: 'commentpl',
  state: [],
  reducers: {
    setcommentpl(state, { payload }) {
      // console.log(payload.hotComments, "comment--")
      state = payload.hotComments
      // console.log("-----------",state)
      return state
    }
  },
  effects: {
    *getcommentpl({ payload }, { call, put }) {
      const res = yield call(apis.commentPlaylist, payload);
      // console.log("res", res)
      yield put({
        type: "setcommentpl",
        payload: res.data
      })
    }
  }
}