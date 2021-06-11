import axios from "axios";

const instance = axios.create({
  baseURL: "https://172.22.150.221/api/",
  timeout: 1000,
  withCredentials: true
})

export default instance;