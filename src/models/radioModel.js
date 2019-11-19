import * as api from "../services/index"
import {
  array
} from "prop-types";
export default {
  namespace: "radio",
  state: {
    //电台推荐的数据
    radioList: [],
    //获取精品的数据
    Products_recommended: [],
  },
  reducers: {
    getDJList(state, payload) {
      /*  console.log(1111,payload); */
      let list = payload.payload
      let arr = [];
      let _state = JSON.parse(JSON.stringify(state))
      for (let i = 0; i < 3; i++) {
        /*  console.log(list[i].copywriter); */
        let obj = {};
        obj.copywriter = list[i].copywriter;
        obj.id = list[i].id;
        obj.name = list[i].name;
        obj.picUrl = list[i].picUrl;
        obj.subCount = list[i].subCount;
        arr.push(obj)
      }
      _state.radioList = arr;
      return _state
    },
    getProducts_recommended(state, payload) {
      let list = payload.payload
      let arr = [];
      let _state = JSON.parse(JSON.stringify(state))
      for (let i = 0; i < 3; i++) {
        let obj = {};
        obj.id = list[i].id;
        obj.name = list[i].name;
        obj.picUrl = list[i].picUrl;
        obj.rcmdText = list[i].rcmdText;
        arr.push(obj)
      }
      _state.Products_recommended = arr;
      return _state
    }
  },

  effects: {
    //获取电台
    * getDJListAsync(payload, {
      put,
      call
    }) {
      let res = yield call(api.getRadioList)
      yield put({
        type: "getDJList",
        payload: res.data.djRadios
      })
    },
    //获取精品
    * getProducts_recommendedAsync(payload, {
      put,
      call
    }) {
      let res = yield call(api.getProducts_recommended)
      yield put({
        type: "getProducts_recommended",
        payload: res.data.data.list
      })
    },

   
  }
}
