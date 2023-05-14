import tmdbConfig from "./tmdb.config.js";

const tmdbEndpoints = {
  // format: api_base_link/endpoint?api_key?qs

  // GET /movie/{movie_id}/lists
  // https://api.themoviedb.org/3/movie/{movie_id}/lists?api_key=<<api_key>>&language=en-US&page=1
  mediaList: ({ mediaType, mediaCategory, page }) => {
    // return format url: ${baseURL}${endPoint}?api_key=${keyApi}&${queryString}
    return tmdbConfig.getUrl(`${mediaType}/${mediaCategory}`, {page});
  },

  // GET /movie/{movie_id}
  // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
  // Or GET /tv/{tv_id}
  // https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US

  mediaDetail: ({ mediaType, media_id }) => {
    return tmdbConfig.getUrl(`${mediaType}/${media_id}`);
  },

  // GET /genre/movie/list or /genre/tv/list
  // https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
  mediaGenre: ({ mediaType }) => {
    return tmdbConfig.getUrl(`genre/${mediaType}/list`);
  },

  // GET /movie/{movie_id}/credits or /tv/{tv_id}/credits
  //https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
  mediaCredits: ({ mediaType, media_id }) => {
    return tmdbConfig.getUrl(`${mediaType}/${media_id}/credits`);
  },

  // GET /movie/{movie_id}/videos or /tv/{tv_id}/videos
  // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
  mediaVideos: ({ mediaType, media_id }) => {
    return tmdbConfig.getUrl(`${mediaType}/${media_id}/videos`);
  },

  // GET /movie/{movie_id}/recommendations or /tv/{tv_id}/recommendations
  // https://api.themoviedb.org/3/tv/{tv_id}/recommendations?api_key=<<api_key>>&language=en-US&page=1
  mediaRecommend: ({ mediaType, media_id }) => {
    return tmdbConfig.getUrl(`${mediaType}/${media_id}/recommendations`);
  },

  // GET /movie/{movie_id}/images or /tv/{tv_id}/images
  // https://api.themoviedb.org/3/tv/{tv_id}/images?api_key=<<api_key>>&language=en-US
  mediaImages: ({ mediaType, media_id }) => {
    return tmdbConfig.getUrl(`${mediaType}/${media_id}/images`);
  },

  // GET /search/movie or /search/tv
  // https://api.themoviedb.org/3/search/tv?api_key=<<api_key>>&language=en-US&include_adult=false&page=1
  mediaSearch: ({ mediaType, query, page }) => {
    return tmdbConfig.getUrl(`search/${mediaType}`, { query, page });
  },

  // GET /person/{person_id}
  // https://api.themoviedb.org/3/person/{person_id}?api_key=<<api_key>>&language=en-US
  personDetail: ({ personId }) => {
    return tmdbConfig.getUrl(`person/${personId}`);
  },

  // GET /person/{person_id}/combined_credits
  // https://api.themoviedb.org/3/person/{person_id}/combined_credits?api_key=<<api_key>>&language=en-US
  personMedias: ({ personId }) => {
    return tmdbConfig.getUrl(`person/${personId}/combined_credits`);
  },
};

export default tmdbEndpoints;
