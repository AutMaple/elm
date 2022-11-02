import axios from "axios";

const baseUrl = "https://elm.cangdu.org";

export const getUser = () =>
  axios.get(baseUrl + "/v1/user", {
    params: {
      user_id: getLocalStorage("userId"),
    },
  });

export const cityGuess = () => axios.get(baseUrl + "/v1/cities?type=guess");

export const hotCity = () => axios.get(baseUrl + "/v1/cities?type=hot");

export const groupCity = () => axios.get(baseUrl + "/v1/cities?type=group");

export const currentCity = (cityId) => axios.get(baseUrl + "/v1/cities/" + cityId);

export const getLocalStorage = (key) => {
  if (!key) return;
  return window.localStorage.getItem(key);
};

export const setLocalStorage = (key, value) => {
  if (!key) return;
  if (typeof value !== "string") {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};

export const removeLocalStorage = (key) => {
  if (!key) return;
  window.localStorage.removeItem(key);
};

export const searchPlace = (cityId, keyword) =>
  axios.get(baseUrl + "/v1/pois", {
    params: {
      type: "search",
      city_id: cityId,
      keyword: keyword,
    },
  });
