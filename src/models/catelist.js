import * as apis from "../services";

export default {
  namespace: "catelist",
  state: [],
  reducers: {
    setcatelist(state, { payload }) {
      state = payload.categories;
      return state;
    },
  },
  effects: {
    *getcatelist({ payload }, { call, put }) {
      const res = yield call(apis.getRadioType);
      yield put({
        type: "setcatelist",
        payload: res.data,
      });
    },
  },
};
