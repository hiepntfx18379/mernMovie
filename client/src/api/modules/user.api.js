import privateClient from "../client/private.client.js";

const userEndpoints = {
  getInfo: "user/getInfo",
  passwordUpdate: "user/update",
};

const userApi = {
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  passwordUpdate: async ({ password, newPassword, confirmPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmPassword,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userApi;
