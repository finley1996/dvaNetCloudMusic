import * as apis from "../services"

export default {
  namespace: 'djprograms',
  state: [],
  reducers: {
    setdjprograms(state, { payload }) {
      // console.log("djprograms__payload",payload)
      let _state = JSON.parse(JSON.stringify(state))
      let arr = []
      for (let i = 0; i < payload.length; i++) {
        arr.push(payload[i].name)
      }
      _state = JSON.parse(JSON.stringify(arr))
      return _state
    }
  },
  effects: {
    *getdjprograms({ payload }, { call, put }) {
      const res = yield call(apis.djprogram, payload)
      // console.log("djprograms__res---", res)
      yield put({
        type: "setdjprograms",
        payload: res.data.programs
      })
    }
  }
}