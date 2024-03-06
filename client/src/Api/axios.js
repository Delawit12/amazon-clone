import axios from "axios";

const axiosInstance = axios.create({
  //     baseURL: "https://cute-ruby-cricket-gown.cyclic.cloud/"
  //    // baseURL: "https://amazon-clone-g4tg.onrender.com"
  baseURL: "http://localhost:7088/",
});

export default axiosInstance;
