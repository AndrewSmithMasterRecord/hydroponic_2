import axios from "axios";

const instance = axios.create({
  baseURL: "https://172.17.253.5/api/",
  timeout: 1000,
  withCredentials: true
})

export default instance;