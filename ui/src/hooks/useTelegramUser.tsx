import { useEffect, useState } from "react";
import { useGetAllUsers } from "kan/hooks/useGetAllUsers";
import { useCreateUserMutate } from "kan/hooks/useCreateUserMutate";
import { useGetUserInfo } from "kan/hooks/useGetUserInfo";
import { ITelegramUserInfo } from "kan/types";
import WebApp from "@twa-dev/sdk";

interface UseTelegramUserReturn {
  user: ITelegramUserInfo | null;
  userInfo?: ITelegramUserInfo;
  isLoading: boolean;
  isNewUser: boolean;
}

export const useTelegramUser = (): UseTelegramUserReturn => {
  const { data: userList, isLoading: isUserListLoading } = useGetAllUsers();
  const { mutate: createUserMutate, isPending: isCreatingUser } =
    useCreateUserMutate();
  const [user, setUser] = useState<ITelegramUserInfo | null>(null);
  const { data: userInfo, isLoading: isUserInfoLoading } = useGetUserInfo(
    user?.id || 0
  );

  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userTelegram = WebApp.initDataUnsafe?.user as ITelegramUserInfo;
      if (userTelegram) {
        setUser(userTelegram);
        const existingUser = userList?.find((u) => u.id === userTelegram.id);
        if (!existingUser) {
          setIsNewUser(true);
          // Create a new user if not already exists
          createUserMutate({
            ...userTelegram,
            turns: 100, // Default initial value
          });
        }
      }
    }
  }, [userList, createUserMutate]);

  const isLoading = isUserListLoading || isCreatingUser || isUserInfoLoading;

  return {
    user,
    userInfo,
    isLoading,
    isNewUser,
  };
};
