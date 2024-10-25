import { useQuery } from "@tanstack/react-query";
import { userService } from "kan/services/userService";
import { useGetAllUsers } from "./useGetAllUsers";
import { useCreateUserMutate } from "./useCreateUserMutate";
import { ITelegramUserInfo } from "kan/types";

export const useGetUserInfo = (telegramUser: ITelegramUserInfo) => {
  const { data: userList } = useGetAllUsers();
  const { mutate: createUserMutate } = useCreateUserMutate();

  return useQuery<ITelegramUserInfo | null>({
    queryKey: ["getUserInfo", userList, telegramUser],
    queryFn: async () => {
      if (userList) {
        const existedData = userList?.find((u) => u.id === telegramUser?.id);

        if (existedData) {
          const userFromBackend = await userService.getUserInformation(
            String(existedData.id)
          );
          return { ...userFromBackend, isNewUser: true };
        } else {
          return new Promise<ITelegramUserInfo | null>((resolve) => {
            createUserMutate(
              {
                ...telegramUser,
                turns: 100, // Default initial value
              },
              {
                onSuccess: async (data) => {
                  const userInfo = await userService.getUserInformation(
                    String(data.id)
                  );
                  resolve(userInfo);
                },
                onError: () => {
                  resolve(null); // Handle the case when the mutation fails
                },
              }
            );
          });
        }
      }
      return null; // If userList is not defined, return null
    },
    staleTime: 5 * 60 * 1000, // Optional: Cache configuration
  });
};
