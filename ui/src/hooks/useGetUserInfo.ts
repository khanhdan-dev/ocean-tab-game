import { useQuery } from "@tanstack/react-query";
import { userService } from "kan/services/userService";
import { useCreateUserMutate } from "./useCreateUserMutate";
import { ITelegramUserInfo } from "kan/types";

export const useGetUserInfo = (telegramUser: ITelegramUserInfo) => {
  const { mutateAsync: createUserMutate } = useCreateUserMutate();

  return useQuery<ITelegramUserInfo | null>({
    queryKey: ["getUserInfo", telegramUser],
    queryFn: async () => {
      const userList = await userService.getAllUsers();
      if (userList) {
        const existedData = userList?.find((u) => u.id === telegramUser?.id);

        if (existedData) {
          const userFromBackend = await userService.getUserInformation(
            String(existedData.id)
          );
          return { ...userFromBackend, isNewUser: true };
        } else {
          return createUserMutate(
            {
              ...telegramUser,
              turns: 100, // Default initial value
            },
            {
              onSuccess: async (data) => {
                const userInfo = await userService.getUserInformation(
                  String(data.id)
                );
                return userInfo;
              },
              onError: (err) => {
                console.error("err: ", err.message);
                return null; // Handle the case when the mutation fails
              },
            }
          );
        }
      }
      return null; // If userList is not defined, return null
    },
    staleTime: 5 * 60 * 1000, // Optional: Cache configuration
  });
};
