import { useQuery } from '@tanstack/react-query';
import { userService } from 'kan/services/userService';
import { ITelegramUserInfo } from 'kan/types';

export const useGetUserData = (telegramUser: ITelegramUserInfo) => {
  return useQuery<ITelegramUserInfo | null>({
    queryKey: ['getUserInfo', telegramUser],
    queryFn: async () =>
      await userService.getUserInformation(String(telegramUser.id)),
  });
};
