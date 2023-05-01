import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const mediaEndpoint = {
  list: ({ mediaType, mediaCategory, page }) =>
    `media/getList/${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, movie_id }) => `${mediaType}/detail/${movie_id}`,
  search: ({ mediaType, query, page }) =>
    `${mediaType}/search?query=${query}&page=${page}`,
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    console.log(mediaType, mediaCategory, page);
    try {
      const response = await publicClient.get(
        mediaEndpoint.list({ mediaType, mediaCategory, page })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoint.detail({ mediaType, mediaId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoint.search({ mediaType, query, page })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default mediaApi;
