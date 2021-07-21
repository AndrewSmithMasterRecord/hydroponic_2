import axios from "axios";

const instance = axios.create({
  baseURL: "https://192.168.100.160/api/",
  timeout: 1000,
  withCredentials: true
})

export default instance;