import axios from "axios";

const instance = axios.create({
  baseURL: "https://172.20.184.209/api/",
  timeout: 1000,
  withCredentials: true
})

export default instance;