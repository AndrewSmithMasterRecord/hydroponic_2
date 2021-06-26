import axios from "axios";

const instance = axios.create({
  baseURL: "https://172.21.40.167/api/",
  timeout: 1000,
  withCredentials: true
})

export default instance;