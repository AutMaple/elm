import { getUser } from "../services/pullData";

export default {
  async getUserInfo({ commit }) {
    let res = await getUser();
    commit("userInfo", res);
  },
};
