'use client';

import WebApp from '@twa-dev/sdk';
import { useGetUserInfo } from 'kan/hooks/useGetUserInfo';
import { ITelegramUserInfo } from 'kan/types';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import GameProgressBar from './GameProgressBar';
import { FloatingNavbar } from './Navbar/FloatingNavbar';
import { AppContext } from 'kan/contexts/AppContext';

function InitialLoading({ children }: { children: ReactNode }) {
  const { isPlaying } = useContext(AppContext);
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
        localStorage.setItem('telegramId', JSON.stringify(userTelegram));
      } else {
        localStorage.setItem('telegramId', JSON.stringify(telegramUser));
      }
    }
  }, [telegramUser]);

  if (showProgress) {
    return (
      <GameProgressBar isComplete={isSuccess} onComplete={handleComplete} />
    );
  }
  return (
    <>
      {children}
      {!isPlaying ? <FloatingNavbar /> : <></>}
    </>
  );
}

export default InitialLoading;
