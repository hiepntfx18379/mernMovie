import publicClient from "../client/public.client";

// match api with route server
// private for middleware.auth, public is not
const personEndpoints = {
  detail: ({ personId }) => `person/id/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`,
};

const personApi = {
  detail: async ({ personId }) => {
    try {
      const response = await publicClient.get(
        personEndpoints.detail({ personId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
  medias: async ({ personId }) => {
    try {
      const response = await publicClient.get(
        personEndpoints.medias({ personId })
      );
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default personApi;
