'use client';

import LeaderboardTab from 'kan/components/LeaderboardTab/LeaderboardTab';
import { ITelegramUserInfo } from 'kan/types';
import React, { useState } from 'react';

function LeaderboardPage() {
  const telegramUserLocalStorage = JSON.parse(
    localStorage.getItem('telegramUser') ?? 'null',
  );
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
    ...telegramUserLocalStorage,
  });
  return <LeaderboardTab userInfo={telegramUser} />;
}

export default LeaderboardPage;
