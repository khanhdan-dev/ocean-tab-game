'use client';
'use cache';

import WebApp from '@twa-dev/sdk';
import GameHome from 'kan/components/Home/GameHome';
import { ITelegramUserInfo } from 'kan/types';
import { Suspense, useState } from 'react';

if (typeof window !== 'undefined') {
  WebApp.ready();
}

export default function Home() {
  const telegramUserLocalStorage = localStorage.getItem('telegramUser') ?? '';
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
    ...(telegramUserLocalStorage ? JSON.parse(telegramUserLocalStorage) : ''),
  });

  return (
    <Suspense>
      <GameHome telegramUser={telegramUser} />
    </Suspense>
  );
}
