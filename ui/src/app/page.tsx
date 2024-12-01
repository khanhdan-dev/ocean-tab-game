'use client';
import WebApp from '@twa-dev/sdk';
import GameHome from 'kan/components/Home/GameHome';
import { ITelegramUserInfo } from 'kan/types';
import { Suspense, useEffect, useState } from 'react';

if (typeof window !== 'undefined') {
  WebApp.ready();
}

const preloadImages = (imagePaths: string[]) => {
  imagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
  });
};

export default function Home() {
  const [telegramUser, setTelegramUser] = useState<ITelegramUserInfo>({
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

  useEffect(() => {
    const imagePaths = Array.from(
      { length: 16 },
      (_, i) => `/fish/fish${i + 1}.png`,
    );

    preloadImages(imagePaths);
    if (typeof window !== 'undefined') {
      const userTelegram = WebApp.initDataUnsafe?.user as ITelegramUserInfo;

      if (userTelegram) {
        setTelegramUser(userTelegram);
      }
    }
  }, []);
  return (
    <Suspense>
      <GameHome telegramUser={telegramUser} />
    </Suspense>
  );
}
