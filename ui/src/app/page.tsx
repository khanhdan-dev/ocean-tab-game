"use client";
import WebApp from "@twa-dev/sdk";
import GameHome from "kan/components/Home/GameHome";
import { useCreateUserMutate } from "kan/hooks/useCreateUserMutate";
import { useGetAllUsers } from "kan/hooks/useGetAllUsers";
import { ITelegramUserInfo } from "kan/types";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: userList } = useGetAllUsers();
  const [userId, setUserId] = useState<number>(0);
  const { mutate: createUserMutate } = useCreateUserMutate();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userTelegram = WebApp.initDataUnsafe?.user as ITelegramUserInfo;

      if (userTelegram) {
        const existedUser = userList?.find((u) => u.id === userTelegram?.id);
        if (existedUser) {
          localStorage.setItem("newUser", "yes");
        }
        createUserMutate({
          ...userTelegram,
          turns: 100, // Default initial value
        });
        setUserId(userTelegram.id);
      }
    }
    return () => {
      if (typeof window !== "undefined") localStorage.removeItem("newUser");
    };
  }, [userList]);
  return <GameHome userId={userId ?? 6227945989} />;
}
