'use client';
import React, { useContext, useEffect, useState } from 'react';
import useUrlValidation from 'kan/hooks/useUrlValidation';
import { useGetUserInfo } from 'kan/hooks/useGetUserInfo';
import { IFishItem, ITelegramUserInfo } from 'kan/types';
import GameTab from '../GameTab/GameTab';
import { habitatData } from '../Swipers/habitatData';
import { getImageSrc } from 'kan/utils/getImageSrc';
import { AppContext } from 'kan/contexts/AppContext';

interface Props {
  telegramUser: ITelegramUserInfo;
}

function GameHome({ telegramUser }: Props) {
  const { data: userInfo } = useGetUserInfo(telegramUser);
  const { validateUrl } = useUrlValidation();
  const { isPlaying, setIsPlaying } = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem('isPlaying', JSON.stringify(isPlaying));
  }, [isPlaying]);

  const [currentHabitat, setCurrentHabitat] = useState<
    IFishItem['habitat'] | null
  >(
    typeof window !== 'undefined'
      ? ((localStorage.getItem('habitat') ?? '') as IFishItem['habitat'])
      : null,
  );

  const foundHabitat = habitatData.find((h) => h.type === currentHabitat);

  const imageUrl =
    userInfo?.photo_url && validateUrl(userInfo?.photo_url)
      ? userInfo?.photo_url
      : getImageSrc('/diver/diver-avt.png'); // Default image if the URL is invalid

  if (!userInfo) {
    return <></>;
  }

  return (
    <div className="relative flex h-[100dvh] w-screen flex-col items-center justify-center bg-cover">
      <div
        className={`${foundHabitat?.gameBgClass ?? 'bg-ocean'} relative flex h-full w-full flex-col items-center justify-center bg-cover bg-center`}
      >
        <GameTab
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          userInfo={userInfo}
          imageUrl={imageUrl}
          setCurrentHabitat={setCurrentHabitat}
          currentHabitat={currentHabitat}
        />
      </div>
    </div>
  );
}

export default GameHome;
