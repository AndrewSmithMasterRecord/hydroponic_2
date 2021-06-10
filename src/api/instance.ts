import axios from "axios";

const instance = axios.create({
  baseURL: "https://172.17.84.43/api/",
  timeout: 1000,
  withCredentials: true
})

export default instance;