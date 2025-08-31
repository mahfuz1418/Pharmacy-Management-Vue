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

export const setPrivateHeader = () => {
  axiosPrivate.defaults.headers.common["Authorization"] =
    localStorage.getItem("accesstoken");
};
