import { useMutation } from '@tanstack/react-query';
import { userService } from 'kan/services/userService';
import { ITelegramUserInfo } from 'kan/types';

export const useCreateUserMutate = () => {
  return useMutation({
    mutationKey: ['createUserMutate'],
    mutationFn: async (user: ITelegramUserInfo) =>
      await userService.createUser(user),
    onError: (err) => {
      console.error('err: ', err);
    },
  });
};
