import { useQuery } from "@tanstack/react-query";
import { userService } from "kan/services/userService";
import { useGetAllUsers } from "./useGetAllUsers";
import { useCreateUserMutate } from "./useCreateUserMutate";
import { ITelegramUserInfo } from "kan/types";

export const useGetUserInfo = (telegramUser: ITelegramUserInfo) => {
  const { data: userList } = useGetAllUsers();
  const { mutate: createUserMutate } = useCreateUserMutate();
  return useQuery<ITelegramUserInfo>({
    queryKey: ["getUserInfo"],
    queryFn: async () => {
      const existedData = userList?.find((u) => u.id === telegramUser?.id);
      if (existedData) {
        return await userService.getUserInformation(String(existedData.id));
      } else {
        createUserMutate(
          {
            ...telegramUser,
            turns: 100, // Default initial value
          },
          {
            async onSuccess(data) {
              return await userService.getUserInformation(String(data.id));
            },
          }
        );
      }
    },
  });
};
