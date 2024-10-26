import { ITelegramUserInfo } from 'kan/types';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import SpeciesBackground from '../SpeciesBackground';
import BubblesBackground from '../BubbleBackground';
import BackgroundAudio from '../BackgroundAudio';

interface Props {
  isPlayingGame: boolean;
  userInfo: ITelegramUserInfo;
  setIsPlayingGame: Dispatch<SetStateAction<boolean>>;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  imageUrl: string;
}

function GameTab({
  isPlayingGame,
  userInfo,
  setIsPlayingGame,
  setSelectedIndex,
  imageUrl,
}: Props) {
  const [reward, setReward] = useState<string | null>(null);
  const rewards = ['Shell', 'Fish', 'Token'];
  const [isOpenRewardDialog, setIsOpenRewardDialog] = useState(false);

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleTabClick = () => {
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    setReward(randomReward);
    setIsOpenRewardDialog(true);
  };

  return (
    <>
      {isPlayingGame ? (
        <>
          <div className="flex h-[100dvh] flex-col items-center justify-end pb-10 text-center">
            <Image
              className="mt-20 h-[30vh] w-auto animate-pulse"
              src={'/diver/diver-default.png'}
              alt="diver"
              width={20000}
              height={20000}
            />
          </div>
          <div className="absolute left-3 right-3 top-3 z-20">
            <div className="flex w-full items-center justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-700 text-white">
                <p>{userInfo.turns}</p>
              </div>
              <div
                className="flex justify-end"
                onClick={() => setIsPlayingGame(false)}
              >
                <Image
                  className="h-10 w-auto"
                  src={'/control/control-5.png'}
                  alt="diver"
                  width={20000}
                  height={20000}
                />
              </div>
            </div>
          </div>
          <dialog
            open={isOpenRewardDialog}
            className="z-20 mx-auto h-[100dvh] w-[90vw] bg-transparent"
          >
            <div className="flex h-full animate-shake items-center justify-center">
              <div className="flex w-4/5 flex-col items-center gap-3 rounded-xl bg-blue-600 py-5 text-white">
                <div className="flex flex-col items-center gap-5">
                  <Image
                    className="h-[20vh] w-auto bg-firefly-radial"
                    src={`/diver/diver-${reward?.toLowerCase()}.png`}
                    alt="diver"
                    width={20000}
                    height={20000}
                  />
                  <p>Wonderful! You got a {reward}</p>
                </div>
                <form method="dialog">
                  <button
                    className="rounded-lg bg-emerald-500 px-3 py-1"
                    onClick={() => setIsOpenRewardDialog(false)}
                  >
                    OK
                  </button>
                </form>
              </div>
            </div>
          </dialog>
          <SpeciesBackground
            handleTabClick={handleTabClick}
            isOpenRewardDialog={isOpenRewardDialog}
          />
        </>
      ) : (
        <div className="z-20">
          <div className="absolute left-3 right-3 top-3 z-20 flex items-center justify-between">
            <div
              className="flex w-fit cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-ocean-turquoise/50 p-1 px-2 text-white backdrop-blur-sm hover:opacity-80"
              onClick={() => setSelectedIndex(3)}
            >
              <Image
                className="h-10 w-auto animate-shake"
                src={imageUrl}
                alt="diver"
                width={20000}
                height={20000}
              />
              <p className="pr-2">
                Hi, {userInfo.first_name ?? userInfo.username ?? 'Hunter'}
              </p>
            </div>
            <Image
              className="h-10 w-auto"
              src={'/control/control-12.png'}
              alt="diver"
              width={20000}
              height={20000}
              onClick={() => setIsPlayingMusic(!isPlayingMusic)}
            />
          </div>
          <div className="flex -translate-y-28 flex-col items-center justify-start gap-20">
            <Image
              className="h-40 w-auto"
              src={'/logo/logo.png'}
              alt="diver"
              width={20000}
              height={20000}
            />
            <div onClick={() => setIsPlayingGame(!isPlayingGame)}>
              <Image
                className="h-20 w-auto animate-shake-infinite"
                src={'/control/control-2.png'}
                alt="diver"
                width={20000}
                height={20000}
              />
            </div>
          </div>
        </div>
      )}
      <BubblesBackground />
      <BackgroundAudio
        isPlayingGame={isPlayingGame}
        isPlayingMusic={isPlayingMusic}
      />
    </>
  );
}

export default GameTab;
