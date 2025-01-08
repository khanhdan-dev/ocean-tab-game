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
    const shallowImagePaths = Array.from(
      { length: 20 },
      (_, i) => `/fish/shallow/shallow-${i + 1}.png`,
    );
    const reefImagePaths = Array.from(
      { length: 20 },
      (_, i) => `/fish/reef/reef-${i + 1}.png`,
    );
    const openImagePaths = Array.from(
      { length: 20 },
      (_, i) => `/fish/open/open-${i + 1}.png`,
    );
    const deepImagePaths = Array.from(
      { length: 20 },
      (_, i) => `/fish/deep/deep-${i + 1}.png`,
    );

    preloadImages(shallowImagePaths);
    preloadImages(reefImagePaths);
    preloadImages(openImagePaths);
    preloadImages(deepImagePaths);
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
