import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

axiosPrivate.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    console.log(error);
    // Do something with response error
    if (error.response && error.response.status == 401) {
      localStorage.removeItem("accessToken");
      location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const setPrivateHeader = () => {
  axiosPrivate.defaults.headers.common["Authorization"] =
    localStorage.getItem("accesstoken");
};
