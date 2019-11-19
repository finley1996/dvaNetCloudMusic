import * as apis from "../services"

export default {
  namespace: "djdetails",
  state: {
    picUrl: '',
    id: '',
    name: '',
    category: '',
    desc: '',
    buyed: '',
    price: 0,
    subCount: 0,
    programCount: 0,
    commentDatas: []
  },
  reducers: {
    setdjdetails(state, { payload }) {
      // console.log("djdetails_payload---", payload)
      let _state = JSON.parse(JSON.stringify(state))
      // console.log("stae@@@@", state)
      _state.id = payload.id
      _state.picUrl = payload.picUrl
      _state.name = payload.name
      _state.subCount = payload.subCount
      _state.programCount = payload.programCount
      _state.category = payload.category
      _state.buyed = payload.buyed
      _state.price = payload.price
      _state.desc = payload.desc

      //评论信息
      let commentDatas = payload.commentDatas
      let comment = []
      for (let i = 0; i < commentDatas.length; i++) {
        // console.log(commentDatas[i], "000000000")
        let obj = {
          programId: commentDatas[i].programId,
          commentId: commentDatas[i].commentId,
          programName: commentDatas[i].programName,
          nickname: commentDatas[i].userProfile.nickname,
          avatarUrl: commentDatas[i].userProfile.avatarUrl,
          content: commentDatas[i].content
        }
        comment.push(obj)
      }
      _state.commentDatas = JSON.parse(JSON.stringify(comment))
      // console.log("*******************", _state.commentDatas)
      return _state
    }
  },
  effects: {
    *getdjdetails({ payload }, { call, put }) {
      const res = yield call(apis.djDetails, payload)
      console.log("djdetails_res---", res)
      yield put({
        type: "setdjdetails",
        payload: res.data.djRadio
      })
    }
  }
}