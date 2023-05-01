import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:5000/api";

// Make api services
const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use(
  async (config) => {
    return {
      ...config,
      headers: {
        "Content-Type": "application/json",
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

publicClient.interceptors.response.use(
  async (response) => {
    if (response & response.data) return response.data;
    return response;
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

export default publicClient;
