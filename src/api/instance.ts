import axios from "axios";

const instance = axios.create({
  baseURL: "https://172.24.138.192/api/",
  timeout: 1000,
  withCredentials: true
})

export default instance;