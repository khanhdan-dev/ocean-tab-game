import { ITelegramUserInfo } from 'kan/types';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import SpeciesBackground from '../SpeciesBackground';
import BubblesBackground from '../BubbleBackground';
import BackgroundAudio from '../BackgroundAudio';
import { GiFishingNet } from 'react-icons/gi';
import { usePutUpdateUser } from 'kan/hooks/usePutUpdateUser';

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
  const { mutate: putUpdateUserMutate } = usePutUpdateUser();
  const [reward, setReward] = useState<string | null>(null);
  const rewards = ['Shell', 'Fish', 'Token'];
  const [isOpenRewardDialog, setIsOpenRewardDialog] = useState(false);
  const [currentTurns, setCurrentTurns] = useState<number>(userInfo.turns);
  const [userCoins, setUserCoins] = useState(userInfo.resources.coins);
  const [userFish, setUserFish] = useState(userInfo.resources.fish);
  const [userShells, setUserShells] = useState(userInfo.resources.shells);

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const handleTabClick = () => {
    setCurrentTurns(currentTurns - 1);
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    if (randomReward === 'Token') {
      setUserCoins(userCoins + 1);
    } else if (randomReward === 'Shell') {
      setUserShells(userShells + 1);
    } else {
      setUserFish(userFish + 1);
    }
    setReward(randomReward);
    setIsOpenRewardDialog(true);

    const rewardCustomList: {
      name: 'Shell' | 'Token' | 'Fish';
      key: 'shells' | 'coins' | 'fish';
    }[] = [
      { name: 'Shell', key: 'shells' },
      { name: 'Token', key: 'coins' },
      { name: 'Fish', key: 'fish' },
    ];

    // if (userInfo.resources && reward) {
    const rewardObj = rewardCustomList.find((r) => r.name === reward);

    const newRewardObj = {
      shells: 0,
      coins: 0,
      fish: 0,
    };
    if (rewardObj && currentTurns > 0) {
      const resources = userInfo.resources
        ? {
            ...userInfo.resources,
            [rewardObj.key]: userInfo.resources[rewardObj.key] + 1,
          }
        : { ...newRewardObj, [rewardObj.key]: newRewardObj[rewardObj.key] };

      putUpdateUserMutate({
        userId: String(userInfo.id),
        user: { resources, turns: currentTurns - 1 },
      });
    }
  };

  const onRenderUserRewards = () => {
    const rewardList = [
      {
        name: 'Coin',
        value: userCoins,
      },
      {
        name: 'Fish',
        value: userFish,
      },
      {
        name: 'Shell',
        value: userShells,
      },
    ];
    return rewardList.map((r) => {
      return (
        <div
          key={r.name}
          className="flex items-center justify-between gap-2 text-sm"
        >
          <Image
            src={`/resources/${r.name.toLowerCase()}.png`}
            alt={r.name}
            className="h-6 w-auto rounded-lg"
            width={20000}
            height={20000}
          />
          <p className="font-semibold text-ocean-yellow">{r.value}</p>
        </div>
      );
    });
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
          <div className="absolute left-3 right-3 top-3">
            <div className="flex w-full items-start justify-between gap-3">
              <div className="flex flex-col gap-2 rounded-xl border border-white/20 bg-ocean-turquoise/80 p-1 px-2 text-white backdrop-blur-sm hover:opacity-80">
                <div className="flex items-center justify-center gap-1 text-3xl text-white">
                  <GiFishingNet
                    className="inset-0 animate-wrap-net font-thin"
                    size={30}
                  />
                  <p className="font-bold text-ocean-flashturq">
                    {currentTurns}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {onRenderUserRewards()}
                </div>
              </div>
              <div className="z-30 flex flex-col justify-end gap-2">
                <Image
                  className="h-10 w-auto"
                  src={'/control/control-5.png'}
                  alt="diver"
                  width={20000}
                  height={20000}
                  onClick={() => setIsPlayingGame(false)}
                />
                <Image
                  className="h-10 w-auto"
                  src={`/control/control-${isPlayingMusic ? '11' : '12'}.png`}
                  alt="diver"
                  width={20000}
                  height={20000}
                  onClick={() => setIsPlayingMusic(!isPlayingMusic)}
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
            userInfo={userInfo}
            reward={reward}
            currentTurns={currentTurns}
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
              src={`/control/control-${isPlayingMusic ? '11' : '12'}.png`}
              alt="diver"
              width={20000}
              height={20000}
              onClick={() => setIsPlayingMusic(!isPlayingMusic)}
            />
          </div>
          <div className="flex flex-col items-center justify-start gap-20">
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
