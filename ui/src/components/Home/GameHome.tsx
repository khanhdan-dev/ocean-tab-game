'use client';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
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
  const [isOpenGreetingDialog, setIsOpenGreetingDialog] = useState(true);
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

  const handleCreateUser = () => {
    setIsOpenGreetingDialog(false);
  };

  const imageUrl =
    userInfo?.photo_url && validateUrl(userInfo?.photo_url)
      ? userInfo?.photo_url
      : getImageSrc('/diver/diver-avt.png'); // Default image if the URL is invalid

  if (!userInfo) {
    return <></>;
  }

  return (
    <div className="relative flex h-[100dvh] w-screen flex-col items-center justify-center bg-cover">
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
                {userInfo.isNewUser
                  ? `Welcome Back, ${
                      userInfo.first_name ?? userInfo.username ?? 'you'
                    }!`
                  : `Welcome ${
                      userInfo.first_name ?? userInfo.username ?? 'you'
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
