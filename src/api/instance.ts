import axios from "axios";

const instance = axios.create({
  baseURL: "https://172.26.90.58/api/",
  timeout: 1000,
  withCredentials: true
})

export default instance;