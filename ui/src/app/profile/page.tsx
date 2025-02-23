'use client';

import ProfileTab from 'kan/components/ProfileTab/ProfileTab';
import { ITelegramUserInfo } from 'kan/types';
import React, { useState } from 'react';

function ProfilePage() {
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
  return <ProfileTab userInfo={telegramUser} />;
}

export default ProfilePage;
