import axios from "axios";

const instance = axios.create({
  baseURL: "https://172.29.31.169/api/",
  timeout: 1000,
  withCredentials: true
})

export default instance;