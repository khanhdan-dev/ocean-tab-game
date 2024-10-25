import { useQuery } from "@tanstack/react-query";
import { userService } from "kan/services/userService";

export const useGetUserInfo = (id: number) =>
  useQuery({
    queryKey: ["getUserInfo"],
    queryFn: async () => await userService.getUserInformation(String(id)),
  });
