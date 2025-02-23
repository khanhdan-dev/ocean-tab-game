'use client';

import WebApp from '@twa-dev/sdk';
import { useGetUserInfo } from 'kan/hooks/useGetUserInfo';
import { ITelegramUserInfo } from 'kan/types';
import React, { ReactNode, useEffect, useState } from 'react';
import GameProgressBar from './GameProgressBar';
import { FloatingNavbar } from './Navbar/FloatingNavbar';
import { AppContext } from 'kan/contexts/AppContext';
import Image from 'next/image';
import { getImageSrc } from 'kan/utils/getImageSrc';

function InitialLoading({ children }: { children: ReactNode }) {
  const [isOpenGreetingDialog, setIsOpenGreetingDialog] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [telegramUser] = useState<ITelegramUserInfo>({
    first_name: 'Kan',
    id: 0,
    turns: 100,
    username: 'kanshiro',
    resources: {
      fish: 0,
      shells: 0,
      coins: 0,
    },
  });
  const { isSuccess } = useGetUserInfo(telegramUser);
  const [showProgress, setShowProgress] = useState(true);
  const handleComplete = () => {
    setTimeout(() => setShowProgress(false), 1800);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userTelegram = WebApp.initDataUnsafe?.user as ITelegramUserInfo;

      if (userTelegram) {
        localStorage.setItem('telegramUser', JSON.stringify(userTelegram));
      } else {
        localStorage.setItem('telegramUser', JSON.stringify(telegramUser));
      }
    }
  }, [telegramUser]);

  if (showProgress) {
    return (
      <GameProgressBar isComplete={isSuccess} onComplete={handleComplete} />
    );
  }

  const handleCreateUser = () => {
    setIsOpenGreetingDialog(false);
  };
  return (
    <AppContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
      }}
    >
      <dialog
        open={isOpenGreetingDialog}
        className="z-30 mx-auto h-[100dvh] w-[90vw] bg-transparent md:w-fit"
      >
        <div className="z-50 flex h-full animate-shake items-center justify-center">
          <div className="flex w-4/5 flex-col items-center gap-3 rounded-xl bg-blue-600 px-3 py-5 text-white">
            <div className="flex items-center justify-between gap-4">
              <Image
                className="h-[20vh] w-auto bg-firefly-radial"
                src={getImageSrc(`/diver/diver-greeting.png`)}
                alt="diver"
                width={20000}
                height={20000}
              />
              <h2 className="text-lg font-semibold">
                {!telegramUser.isNewUser
                  ? `Welcome Back, ${
                      telegramUser.first_name ?? telegramUser.username ?? 'you'
                    }!`
                  : `Welcome ${
                      telegramUser.first_name ?? telegramUser.username ?? 'you'
                    } to the fantastic Journey!`}
              </h2>
            </div>
            <form method="dialog">
              <button
                className="rounded-lg bg-emerald-500 px-3 py-1"
                onClick={handleCreateUser}
              >
                OK
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {children}
      {!isPlaying ? <FloatingNavbar /> : <></>}
    </AppContext.Provider>
  );
}

export default InitialLoading;
