import axios from "axios";

const instance = axios.create({
  baseURL: "https://172.27.49.237/api/",
  timeout: 1000,
  withCredentials: true
})

export default instance;