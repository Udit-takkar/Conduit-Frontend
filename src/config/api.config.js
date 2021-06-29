import Axios from "axios";
import { API_BASE_URL } from "../constants/api";
import myLog from "../utils/myLog";
import jwt_decode from "jwt-decode";

let token = null;

export const setToken = (tkn) => {
  token = tkn;
};

const axios = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  withCredentials: true,
});
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
    let request = config;

    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now() / 1000) {
        Axios.post("/refresh")
          .then((res) => {
            console.log("Refreshing");
            setToken(res.data.access_token);
          })
          .catch((err) => {
            if (err.response.status === 401) {
              //dispatch logout
              window.location.href = "http://localhost:3000/login";
            }
          });
      }
    }

    // if (token && typeof token !== "undefined") {
    //   request.headers["Authorization"] = `Token ${token}`;
    // }
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.request.use((request) => {
  myLog(
    `------------------ \nRequest to ${request.method.toUpperCase()} ${
      request.url
    } with params`,
    request.params,
    `and data`,
    request.data
  );
  return request;
});

axios.interceptors.response.use(
  (response) => {
    myLog(
      `------------------ \nResponse from ${response.config.method.toUpperCase()} ${
        response.config.url
      } with params`,
      response.config.params,
      `and data`,
      response.config.data,
      `and got response data ->`,
      response.data
    );
    return response;
  },
  function (error) {
    console.log(error.response);
  }
);

export default axios;
