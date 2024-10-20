import { ITelegramUserInfo } from "kan/types";
import { https } from "./configURL";

export const userService = {
  getAllUsers: async () => {
    const response = await https.get(`/users`);
    return response.data;
  },
  getUserInformation: async (userId: string) => {
    const response = await https.get(`/users?id=${userId}`);
    return response.data;
  },
  createUser: async (createUser: ITelegramUserInfo) => {
    const response = await https.post(`/users`, createUser);
    return response.data;
  },
};
