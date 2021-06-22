import axios from "axios";

const instance = axios.create({
  baseURL: "https://172.29.190.38/api/",
  timeout: 1000,
  withCredentials: true
})

export default instance;