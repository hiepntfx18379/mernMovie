import publicClient from "../client/public.client";

const genreEndpoint = {
  list: ({ mediaType }) => `media/genres?${mediaType}`,
};

export const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(
        genreEndpoint.list({ mediaType })
      );

      return { response };
    } catch (err) {
      console.log(err);
      return { err };
    }
  },
};
