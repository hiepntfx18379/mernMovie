import axiosClient from "../axios/axios.client.js";
import tmdbEndpoints from "./tmdb.endpoint.js";

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
    ),

  mediaDetail: async ({ mediaType, media_id }) => {
    return await axiosClient.get(
      tmdbEndpoints.mediaDetail({ mediaType, media_id })
    );
  },

  mediaCredits: async ({ mediaType, media_id }) =>
    await axiosClient.get(tmdbEndpoints.mediaCredits({ mediaType, media_id })),

  mediaGenres: async ({ mediaType }) =>
    await axiosClient.get(tmdbEndpoints.mediaGenre({ mediaType })),

  mediaImages: async ({ mediaType, media_id }) =>
    await axiosClient.get(tmdbEndpoints.mediaImages({ mediaType, media_id })),

  mediaRecommend: async ({ mediaType, media_id }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaRecommend({ mediaType, media_id })
    ),

  mediaVideos: async ({ mediaType, media_id }) =>
    await axiosClient.get(tmdbEndpoints.mediaVideos({ mediaType, media_id })),

  mediaSearch: async ({ mediaType, query, page, language, year }) => {
    return await axiosClient.get(
      tmdbEndpoints.mediaSearch({ mediaType, query, page, language, year })
    );
  },

  personDetail: async ({ personId }) => {
    return await axiosClient.get(tmdbEndpoints.personDetail({ personId }))},

  personMedias: async ({ personId }) =>
    await axiosClient.get(tmdbEndpoints.personMedias({ personId })),

  language: async () => {
    return await axiosClient.get(tmdbEndpoints.language("configuration/languages"))
  }
};

export default tmdbApi;
