import { ITelegramUserInfo } from "kan/types";
import { https } from "./configURL";
import { AxiosResponse } from "axios";

export const userService = {
  getAllUsers: async () => {
    const response: AxiosResponse<ITelegramUserInfo[]> = await https.get(
      `/users`
    );
    return response.data;
  },
  getUserInformation: async (userId: string) => {
    const response = await https.get(`/users/${userId}`);
    return response.data;
  },
  createUser: async (createUser: ITelegramUserInfo) => {
    const response: AxiosResponse<ITelegramUserInfo> = await https.post(
      `/users`,
      createUser
    );
    return response.data;
  },
  updateUser: async (updateUser: Partial<ITelegramUserInfo>) => {
    const response: AxiosResponse<ITelegramUserInfo> = await https.put(
      `/users`,
      updateUser
    );
    return response.data;
  },
};
