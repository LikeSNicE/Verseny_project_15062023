import axios from "axios";

export const ApiUrl = "http://127.0.0.1:8000/api/"

const Api = axios.create({
  baseURL: ApiUrl,
  withCredentials: true,
  credentials: "same-origin",
});

Api.interceptors.request.use((config) =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}` 
    return config;
})

export default Api;

