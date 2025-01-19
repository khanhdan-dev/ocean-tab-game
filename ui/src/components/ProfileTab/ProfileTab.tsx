import {
  faGamepad,
  faMedal,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITelegramUserInfo } from 'kan/types';
import Image from 'next/image';
import React from 'react';
import { Model } from './Model';
import RenderModel from '../RenderModel';

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
  return (
    <div className="min-h-[100dvh] bg-ocean-primary-medium p-4 pb-20 pt-10 text-ocean-white">
      <div className="bg-primary-medium mb-6 flex items-center justify-between rounded-lg pr-2">
        <div className="items-items-center flex w-fit cursor-pointer gap-2 rounded-full px-2 text-white hover:opacity-80">
          {/* <Image
            className="h-40 w-auto bg-firefly-radial object-contain"
            src="/shop/skin/skin-1.png"
            alt="skin"
            width={20000}
            height={20000}
          /> */}
          <div className="flex items-center justify-between">
            <div className="z-50 mx-auto flex h-[12rem] w-[7rem]">
              <RenderModel className="bg-firefly-radial">
                <Model />
              </RenderModel>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="mt-3 w-fit animate-shake rounded-full bg-ocean-white/20 px-4 py-2 text-center text-xl font-semibold text-ocean-flashturq shadow-inner shadow-ocean-white brightness-150">
              {userInfo.first_name ?? userInfo.username ?? 'Hunter'}
            </p>
            <div className="flex items-center gap-2">
              <Image
                className="h-auto w-20 bg-firefly-radial object-contain"
                src="/profile/rank.png"
                alt="rank"
                width={20000}
                height={20000}
              />
              <p className="text-xl font-black">{currentUser.rank}</p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                className="h-auto w-20 bg-firefly-radial object-contain"
                src="/profile/score.png"
                alt="score"
                width={20000}
                height={20000}
              />
              <p className="text-xl font-black">{currentUser.score}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="mb-6 rounded-lg bg-ocean-blue bg-opacity-20 p-4 shadow-lg backdrop-blur-md">
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
      </div>

      {/* Recent Activity Section */}
      <div className="mb-6 rounded-lg bg-ocean-blue bg-opacity-20 p-4 shadow-lg backdrop-blur-md">
        <h3 className="mb-4 text-xl font-semibold">Recent Activity</h3>
        <ul className="list-inside list-disc space-y-2">
          {currentUser.recentActivity.map((activity, index) => (
            <li key={index} className="text-sm">
              {activity}
            </li>
          ))}
        </ul>
      </div>

      {/* Friends Count */}
      <div className="rounded-lg bg-ocean-blue bg-opacity-20 p-4 shadow-lg backdrop-blur-md">
        <h3 className="mb-4 text-xl font-semibold">Friends</h3>
        <p className="text-center text-lg">
          {currentUser.friendsCount} Friends
        </p>
      </div>
    </div>
  );
}

export default ProfileTab;
