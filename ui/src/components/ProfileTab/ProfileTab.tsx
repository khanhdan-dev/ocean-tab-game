import {
  faGamepad,
  faMedal,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITelegramUserInfo } from 'kan/types';
import Image from 'next/image';
import React, { useState } from 'react';
import { Model } from './Model';
import RenderModel from '../RenderModel';
import { getImageSrc } from 'kan/utils/getImageSrc';
import { Achievements } from './Achievements';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

interface Props {
  userInfo: ITelegramUserInfo;
}

interface Achievement {
  title: string;
  description: string;
  icon: JSX.Element;
}

interface User {
  username: string;
  level: number;
  score: number;
  rank: number;
  avatarUrl: string;
  achievements: Achievement[];
  recentActivity: string[];
  friendsCount: number;
}

const currentUser: User = {
  username: 'Player1',
  level: 15,
  score: 2300,
  rank: 4,
  avatarUrl: 'https://i.pravatar.cc/150?img=1',
  achievements: [
    {
      title: 'Top Player',
      description: 'Ranked top 10 globally',
      icon: <FontAwesomeIcon icon={faTrophy} />,
    },
    {
      title: 'Sharpshooter',
      description: '100% accuracy in last game',
      icon: <FontAwesomeIcon icon={faMedal} />,
    },
    {
      title: 'Veteran',
      description: 'Over 1000 hours played',
      icon: <FontAwesomeIcon icon={faGamepad} />,
    },
  ],
  recentActivity: [
    'Won the weekly tournament',
    'Achieved new high score',
    "Unlocked 'Sharpshooter' badge",
  ],
  friendsCount: 120,
};

function ProfileTab({ userInfo }: Props) {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const handleOpenEditProfile = () => {
    setOpenEditProfile(!openEditProfile);
  };

  const onRenderGears = () => {
    const gearList = [
      { id: 'skin', name: 'Skin', img: getImageSrc('/diver/diver-test.png') },
      { id: 'skill', name: 'Skill', img: getImageSrc('/skills/skill-1.png') },
      {
        id: 'equipment',
        name: 'Equipment',
        img: getImageSrc('/equipments/equipment-1.jpeg'),
      },
    ];
    return gearList.map((gear) => {
      return (
        <div key={gear.id} className="flex flex-col items-center">
          <h3 className="mb-1 font-semibold text-ocean-flashturq">
            {gear.name}
          </h3>
          <div className="aspect-square h-16">
            <Image
              className="aspect-square h-full rounded-2xl object-contain shadow shadow-ocean-turquoise"
              src={gear.img}
              alt="diver"
              width={20000}
              height={20000}
            />
          </div>
        </div>
      );
    });
  };
  return (
    <div className="bg-profile">
      {/* <dialog
        open={openEditProfile}
        className="z-50 mx-auto h-[80dvh] w-[90vw] bg-transparent md:w-fit"
      >
        <div className="flex h-full items-center justify-center">
          <div className="flex h-5/6 w-full flex-col items-center gap-3 rounded-xl border border-ocean-lightgrey px-3 py-5 text-white">
            <div className="relative flex h-full items-center justify-between gap-4">
              <div
                className="mx-auto flex h-[12rem] w-[7rem]"
                onClick={handleOpenEditProfile}
              >
                <RenderModel className="bg-firefly-radial">
                  <Model />
                </RenderModel>
              </div>
              <div className="absolute inset-0 z-10"></div>
            </div>
            <form method="dialog" className="flex w-full justify-evenly gap-2">
              <button
                onClick={handleOpenEditProfile}
                className="rounded-lg bg-ocean-lightgrey px-3 py-1"
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-emerald-500 px-3 py-1"
                onClick={handleOpenEditProfile}
              >
                OK
              </button>
            </form>
          </div>
        </div>
      </dialog> */}
      {openEditProfile ? (
        <div className="min-h-[100dvh] p-4 pt-10 text-ocean-white">
          <div className="flex min-h-[80dvh] flex-col items-center justify-between">
            <div className="flex w-full flex-1 flex-col items-center gap-4 py-3">
              <div className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold">Character</h3>
                <div
                  className="mx-auto flex h-[20rem] w-[13rem]"
                  onClick={handleOpenEditProfile}
                >
                  <RenderModel>
                    <Model />
                  </RenderModel>
                </div>
              </div>
              <div className="flex h-full w-full justify-between gap-3">
                {onRenderGears()}
              </div>
            </div>
            <div className="flex w-full justify-evenly gap-2">
              <button
                onClick={handleOpenEditProfile}
                className="rounded-lg bg-ocean-lightgrey px-3 py-1"
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-emerald-500 px-3 py-1"
                onClick={handleOpenEditProfile}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-[100dvh] p-4 pt-5 text-ocean-white">
          <div className="bg-primary-medium mb-6 flex items-center justify-between rounded-lg pr-2">
            <div className="items-items-center flex w-fit cursor-pointer gap-2 rounded-full px-2 text-white hover:opacity-80">
              <div className="flex items-center justify-between">
                <div
                  className="z-10 mx-auto flex h-[12rem] w-[7rem]"
                  onClick={handleOpenEditProfile}
                >
                  <RenderModel>
                    <Model />
                  </RenderModel>
                </div>
              </div>
              <div className="flex h-fit flex-col rounded-2xl px-3 py-2">
                <p className="w-fit animate-shake rounded-full bg-ocean-white/20 px-4 py-2 text-center text-xl font-semibold text-ocean-darkblue shadow-inner shadow-ocean-white brightness-150 backdrop-blur-sm">
                  {userInfo.first_name ?? userInfo.username ?? 'Hunter'}
                </p>
                <div className="flex items-center gap-2">
                  <Image
                    className="h-auto w-20 object-contain"
                    src={getImageSrc('/profile/rank.png')}
                    alt="rank"
                    width={20000}
                    height={20000}
                  />
                  <p className="text-xl font-black">{currentUser.rank}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    className="h-auto w-20 object-contain"
                    src={getImageSrc('/profile/score.png')}
                    alt="score"
                    width={20000}
                    height={20000}
                  />
                  <p className="text-xl font-black">{currentUser.score}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <Popover className="relative">
              <PopoverButton className="flex h-[4rem] w-[3rem] bg-opacity-40 bg-firefly-radial outline-none">
                <RenderModel>
                  <Achievements />
                </RenderModel>
              </PopoverButton>
              <PopoverPanel
                anchor="right start"
                className="mb-6 rounded-lg bg-ocean-blue/60 p-4 shadow-lg backdrop-blur-md"
              >
                <h3 className="mb-4 text-xl font-semibold">Achievements</h3>
                <div className="space-y-2">
                  {currentUser.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center rounded-lg border px-4 py-2"
                    >
                      <div className="mr-3 text-ocean-flashturq">
                        {achievement.icon}
                      </div>
                      <div>
                        <p className="font-bold text-ocean-flashturq">
                          {achievement.title}
                        </p>
                        <p className="text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <Popover className="relative flex justify-end">
              <PopoverButton className="flex h-[4rem] w-[3rem] bg-opacity-40 bg-firefly-radial outline-none">
                <RenderModel>
                  <Achievements />
                </RenderModel>
              </PopoverButton>
              <PopoverPanel
                anchor="left start"
                className="mb-6 rounded-lg bg-ocean-blue/60 p-4 shadow-lg backdrop-blur-md"
              >
                <h3 className="mb-4 text-xl font-semibold">Recent Activity</h3>
                <ul className="list-inside list-disc space-y-2">
                  {currentUser.recentActivity.map((activity, index) => (
                    <li key={index} className="text-sm">
                      {activity}
                    </li>
                  ))}
                </ul>
              </PopoverPanel>
            </Popover>

            <Popover className="relative">
              <PopoverButton className="flex h-[4rem] w-[3rem] bg-opacity-40 bg-firefly-radial outline-none">
                <RenderModel>
                  <Achievements />
                </RenderModel>
              </PopoverButton>
              <PopoverPanel
                anchor="right start"
                className="mb-6 rounded-lg bg-ocean-blue/60 p-4 shadow-lg backdrop-blur-md"
              >
                <h3 className="mb-4 text-xl font-semibold">Friends</h3>
                <p className="text-center text-lg">
                  {currentUser.friendsCount} Friends
                </p>
              </PopoverPanel>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileTab;
