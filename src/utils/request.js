import axios from "axios";
import store from "@/store";
const request = axios.create({
  baseURL: "http://42.192.129.12:8000"
});
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = store.state?.user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
request.interceptors.response.use();

export default request;
