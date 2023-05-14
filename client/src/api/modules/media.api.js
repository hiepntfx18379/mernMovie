import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const mediaEndpoint = {
  list: ({ mediaType, mediaCategory, page }) =>
    `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, media_id }) => `${mediaType}/getDetail/${media_id}`,
  search: ({ mediaType, query, page }) =>
    `${mediaType}/search?query=${query}&page=${page}`,
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoint.list({ mediaType, mediaCategory, page })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },

  getDetail: async ({ mediaType, media_id }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoint.detail({ mediaType, media_id })
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
