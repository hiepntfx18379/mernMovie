/* 
  ex: GET /movie/{movie_id}
  https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
*/
import dotenv from "dotenv";

dotenv.config();
const keyApi = process.env.TMDB_KEY_PRIVATE;
const baseURL = process.env.API_BASE_LINK;

const getUrl = (endPoint, params) => {
  const queryString = new URLSearchParams(params);
  return `${baseURL}${endPoint}?api_key=${keyApi}&${queryString}`;
};

export default { getUrl };
