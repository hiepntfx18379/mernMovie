import axios from "axios";
import queryString from "query-string";

const baseURL = "https://redfox-server-movie.onrender.com/api";

// Make api services
const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use(
  async (config) => {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("actkn")}`,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  },
);

privateClient.interceptors.response.use(
  async (response) => {
    if (response & response.data) return response.data;
    return response;
  },
  (error) => {
    return Promise.reject(error.message);
  },
);

export default privateClient;
