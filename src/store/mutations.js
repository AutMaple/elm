export default {
  userInfo(state, payload) {
    let data = payload.data;
    if (!state.login)
      // 没有登录过直接返回
      return;
    if (data.message == null)
      // 如果返回来的数据中没有 message，说明获取数据成功
      state.userInfo = data;
  },
};
