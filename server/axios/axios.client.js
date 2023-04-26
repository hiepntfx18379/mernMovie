import axios from "axios";

const get = async (url) => {
  console.log("url", url);
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export default { get };
