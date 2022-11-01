import axios from "axios";

export const getUser = () => "异步发送请求获取数据";

export const cityGuess = () =>
  axios.get("https://elm.cangdu.org/v1/cities?type=guess");

export const hotCity = () =>
  axios.get("https://elm.cangdu.org/v1/cities?type=hot");

export const groupCity = () =>
  axios.get("https://elm.cangdu.org/v1/cities?type=group");
