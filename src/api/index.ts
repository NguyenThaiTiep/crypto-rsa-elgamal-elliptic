import axios from "axios";
import { apiURL } from "../settings/url";
import { history } from "../service/history";
import { handleToast } from "../service/toast";

// import { configureFakeBackend } from '../services/fake-backend';

const API = axios.create({
  baseURL: apiURL,
  responseType: "json",
});

const requestHandler = (request: any) => {
  let token = localStorage.getItem("token");

  if (token) {
    // Thêm token vào header nếu user vẫn tồn tại
    request.headers["x-access-token"] = token;
  }
  return request;
};
export const getToken = () => {
  let token = localStorage.getItem("token");

  return token && token != null;
};

const successHandler = (response: any) => {
  if (response.data.status === 401) {
    history.push("/login");
  }
  if (response.status !== 200) {
    handleToast(response);
  }
  return response;
};

const errorHandler = (error: any) => {
  return Promise.reject({ ...error });
};

API.interceptors.request.use((request) => requestHandler(request));

API.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

// configureFakeBackend(API);

export default API;
