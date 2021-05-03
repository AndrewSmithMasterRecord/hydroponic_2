import axios from "axios";

const instance = axios.create({
  baseURL: "https://172.23.238.27/api/",
  timeout: 1000,
  headers: {
    withCredentials: true
  }
})

export default instance;