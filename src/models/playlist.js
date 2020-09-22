import * as apis from "../services";

export default {
  namespace: "playlist",
  state: [],
  reducers: {
    setplist(state, { payload }) {
      state = payload.playlist.tracks;
      return state;
    },
  },
  effects: {
    *getplist({ payload }, { call, put }) {
      const res = yield call(apis.playlist, payload);
      // console.log(res)
      yield put({
        type: "setplist",
        payload: res.data,
      });
    },
  },
};
