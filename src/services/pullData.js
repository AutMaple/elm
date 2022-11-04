import axios from "axios";
import { last } from "eslint-plugin-vue/lib/utils/indent-utils";

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

export const currentCity = (cityId) =>
  axios.get(baseUrl + "/v1/cities/" + cityId);

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
  axios.get(baseUrl + "/v1/pois/", {
    params: {
      type: "search",
      city_id: cityId,
      keyword: keyword,
    },
  });

export const siteAddress = (geohash) =>
  axios.get(baseUrl + "/v2/pois/" + geohash);

/**
 * 获取 site 页面食品分类列表
 * @param geohash 地址经纬度 geohash
 * @returns {Promise<AxiosResponse<any>>}
 */
export const siteFoodTypes = (geohash) =>
  axios.get(baseUrl + "/v2/index_entry/", {
    params: {
      geohash,
      group_type: "1",
      "flags[]": "F",
    },
  });

export const shopList = (
  latitude,
  longitude,
  offset,
  restaurant_category_id = "",
  restaurant_category_ids = "",
  order_by = "",
  delivery_mode = "",
  supportIds = [],
) => {
  let supportStr = "";
  supportIds.forEach((item) => {
    if (item.status) {
      supportStr += "&support_ids[]=" + item.id;
    }
  });
  let data = {
    latitude,
    longitude,
    offset,
    limit: "20",
    "extras[]": "activitiesl",
    keyword: "",
    restaurant_category_id,
    "restaurant_category_ids[]": restaurant_category_ids,
    order_by,
    "delivery_mode[]": delivery_mode + supportStr,
  };
  return axios.get(baseUrl + "/shopping/restaurants", {
    params: data,
  });
};

export const foodCategory = (latitude, longitude) =>
  axios.get(baseUrl + "/shopping/v2/restaurant/category", {
    params: {
      latitude,
      longitude,
    },
  });

export const foodDelivery = (latitude, longitude) =>
  axios.get(baseUrl + "/shopping/v1/restaurants/delivery_modes", {
    params: {
      latitude,
      longitude,
      kw: "",
    },
  });

export const foodActivity = (latitude, longitude) =>
  axios.get(baseUrl + "/shopping/v1/restaurants/activity_attributes", {
    params: {
      latitude,
      longitude,
      kw: "",
    },
  });
