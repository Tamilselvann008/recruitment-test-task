import { axiosInstanceWithoutToken } from ".";

export const AuthService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await axiosInstanceWithoutToken.post(
        "/auth/login",
        credentials
      );
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};
