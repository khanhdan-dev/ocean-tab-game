import { useQuery } from '@tanstack/react-query';
import { userService } from 'kan/services/userService';

export const useGetAllUsers = () =>
  useQuery({
    queryKey: ['getAllUsers'],
    queryFn: async () => await userService.getAllUsers(),
  });
