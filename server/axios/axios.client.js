import axios from "axios";

const get = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "identity",
      "Set-Cookie": "cross-site-cookie=whatever; SameSite=None; Secure"
    },
  });
  return response.data;
};

export default { get };
