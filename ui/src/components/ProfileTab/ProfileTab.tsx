import {
  faGamepad,
  faMedal,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ITelegramUserInfo } from 'kan/types';
import Image from 'next/image';
import React from 'react';

interface Props {
  userInfo: ITelegramUserInfo;
  imageUrl: string;
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

function ProfileTab({ userInfo, imageUrl }: Props) {
  console.log('imageUrl: ', imageUrl);
  return (
    <div className="min-h-[100dvh] bg-ocean-primary-medium p-4 pb-20 text-ocean-white">
      <div className="bg-primary-medium mb-6 flex items-center justify-between rounded-lg pr-2">
        <div className="flex w-fit cursor-pointer items-start gap-2 rounded-full px-2 text-white hover:opacity-80">
          <Image
            className="h-40 w-auto object-contain"
            src="/shop/skin/skin-1.png"
            alt="diver"
            width={20000}
            height={20000}
          />
          <div className="flex flex-col">
            <p className="text-3xl font-semibold text-ocean-flashturq">
              {userInfo.first_name ?? userInfo.username ?? 'Hunter'}
            </p>
            <p className="text-sm">Rank: #{currentUser.rank}</p>
            <div className="mt-3 animate-shake rounded-full bg-ocean-white/20 p-2 text-center text-sm shadow-inner shadow-ocean-white">
              <p className="font-semibold text-ocean-white">
                Score: {currentUser.score}
              </p>
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
