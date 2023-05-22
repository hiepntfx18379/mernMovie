import privateClient from "../client/private.client";

const favoriteEndpoint = {
  list: "user/favorite",
  add: "user/favorite",
  remove: ({ favId }) => `user/favorite/${favId}`,
};

const favoriteApi = {
  getList: async () => {
    try {
      
      const response = await privateClient.get(favoriteEndpoint.list);

      return { response };
    } catch (err) {
      return { err };
    }
  },

  add: async ({ mediaType, mediaId, mediaTitle, mediaPoster, mediaRate }) => {
    try {
      const response = await privateClient.post(favoriteEndpoint.add, {
        mediaType,
        mediaId,
        mediaTitle,
        mediaPoster,
        mediaRate,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },

  remove: async ({ favId }) => {
    try {
      const response = await privateClient.delete(
        favoriteEndpoint.remove({ favId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default favoriteApi;
