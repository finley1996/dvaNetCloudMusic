import * as apis from "../services";

export default {
  namespace: "plinfo",
  state: {
    name: "",
    bg: "",
    tags: [],
    des: "",
    isShow: false,
  },
  reducers: {
    setplinfo(state, { payload }) {
      // console.log("payload= ",payload)
      state.name = payload.playlist.name;
      state.bg = payload.playlist.coverImgUrl;
      state.tags = payload.playlist.tags;
      state.des =
        "简介：" + payload.playlist.description.split("\n").join("<br/>");
      let _state = JSON.parse(JSON.stringify(state));
      return _state;
    },
    setstutas(state) {
      state.isShow = !state.isShow;
      // console.log("________________",state)
      return state;
    },
  },
  effects: {
    *getplinfo({ payload }, { call, put }) {
      const res = yield call(apis.playlist, payload);
      yield put({
        type: "setplinfo",
        payload: res.data,
      });
    },
  },
};
