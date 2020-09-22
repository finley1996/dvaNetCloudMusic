import * as apis from "../services";

export default {
  namespace: "djs",
  state: {
    category: "",
    data: [],
  },
  reducers: {
    setdjs(state, { payload }) {
      // console.log("----------", payload)
      // state = JSON.parse(JSON.stringify(payload))
      let _state = JSON.parse(JSON.stringify(state));
      _state.category = payload[0].category;
      let arr = [];
      for (let i = 0; i < payload.length; i++) {
        let obj = {
          id: payload[i].id,
          name: payload[i].name,
          picUrl: payload[i].picUrl,
          rcmdtext: payload[i].rcmdtext,
          programCount: payload[i].programCount,
          subCount: payload[i].subCount,
          buyed: payload[i].buyed,
          price: payload[i].price,
          underShelf: payload[i].underShelf,
        };
        // console.log("obj", obj)
        arr.push(obj);
      }
      _state.data = JSON.parse(JSON.stringify(arr));
      // console.log("9999999999", _state)
      return _state;
    },
  },
  effects: {
    *getdjs({ payload }, { call, put }) {
      const res = yield call(apis.getRadioDetails, payload);
      yield put({
        type: "setdjs",
        payload: res.data.djRadios,
      });
    },
  },
};
