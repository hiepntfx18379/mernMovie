import publicClient from "../client/public.client";

const authEndpoint = {
  register: "auth/register",
  login: "auth/login",
};

const authApi = {
  register: async ({ username, displayName, password, confirmPassword }) => {
    try {
      const response = await publicClient.post(authEndpoint.register, {
        username,
        displayName,
        password,
        confirmPassword,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },

  login: async ({ username, password }) => {
    try {
      const response = await publicClient.post(authEndpoint.login, {
        username,
        password,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default authApi;
