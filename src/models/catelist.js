import * as apis from "../services"

export default {
  namespace: 'catelist',
  state: [],
  reducers: {
    setcatelist(state, { payload }) {
      // console.log("catelist-model-state", state)
      // console.log("catelist-model-payload", payload)
      state = payload.categories
      // console.log("catelist-model-state-return", state)
      return state
    }
  },
  effects: {
    *getcatelist({ payload }, { call, put }) {
      const res = yield call(apis.getRadioType)
      // console.log("catelist-model-res", res)
      yield put({
        type: "setcatelist",
        payload: res.data
      })
    }
  }
}