'use client';

import ShopTab from 'kan/components/ShopTab/ShopTab';
import { ITelegramUserInfo } from 'kan/types';
import React, { useState } from 'react';

function ShopPage() {
  const telegramUserLocalStorage = JSON.parse(
    localStorage.getItem('telegramUser') ?? '',
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
  return <ShopTab userInfo={telegramUser} />;
}

export default ShopPage;
