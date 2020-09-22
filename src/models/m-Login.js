import { effects } from "redux-saga";
// import * as apis from "../services/example"
import * as apis from "../services/example";

export default {
  namespace: "loginData",
  state: {
    number: "",
    flage: "",
  },
  reducers: {
    getlogindata(state, { payload }) {
      console.log(state, "state");
      console.log(payload, "payload");
      // let _state = JSON.parse(JSON.stringify(state))
      // _state.getphone =
      return null;
    },
  },
  effects: {
    *getdata({ payload }, { call, put }) {
      // 第一个是传递的参数，请求数据的结果，put是返回去的给reducers用的数据
      console.log(1111111111111);
      const res = yield call(apis.getLogin, payload);
      console.log(res);
      yield put({
        type: "getlogindata",
        payload: res.data,
      });
    },
  },
};
