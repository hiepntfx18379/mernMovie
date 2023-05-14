import privateClient from "../client/private.client";

// Communicate with server by link api
const reviewEndpoints = {
  list: "review",
  add: "review",
  remove: ({ reviewId }) => `review/${reviewId}`,
};

const reviewApi = {
  add: async ({ mediaType, mediaId, mediaTitle, mediaPoster, content }) => {
    try {
      const response = await privateClient.post(reviewEndpoints.add, {
        mediaType,
        mediaId,
        mediaTitle,
        mediaPoster,
        content,
      });
      return { response };
    } catch (err) {
      return { err };
    }
  },
  remove: async ({ reviewId }) => {
    try {
      const response = await privateClient.delete(
        reviewEndpoints.remove({ reviewId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },

  getList: async () => {
    try {
      const response = await privateClient.get(reviewEndpoints.list);
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default reviewApi;
