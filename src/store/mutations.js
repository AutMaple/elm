export default {
  userInfo(state, payload) {
    state.userInfo = payload;
    console.log(payload);
  },
};
