import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from 'kan/services/userService';
import { ITelegramUserInfo } from 'kan/types';

export const usePutUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['putUpdateUser'],
    mutationFn: async ({
      userId,
      user,
    }: {
      userId: string;
      user: Partial<ITelegramUserInfo>;
    }) => await userService.updateUser(userId, user),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['getUserInfo'] });
    },
    onError: (err) => {
      console.error('err: ', err);
    },
  });
};
