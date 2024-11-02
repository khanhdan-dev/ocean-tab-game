import { ITelegramUserInfo } from 'kan/types';
import Image from 'next/image';
import React from 'react';

interface Props {
  userInfo: ITelegramUserInfo;
}

interface Player {
  username: string;
  rank: number;
  score: number;
  avatarUrl: string;
  isCurrentUser?: boolean;
}

function LeaderboardTab({ userInfo }: Props) {
  const leaderboard: Player[] = [
    {
      username: 'Champion',
      rank: 1,
      score: 5000,
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
    },
    {
      username: 'RunnerUp',
      rank: 2,
      score: 4800,
      avatarUrl: 'https://i.pravatar.cc/150?img=4',
    },
    {
      username: 'BronzeStar',
      rank: 3,
      score: 4500,
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
    },
    {
      username: userInfo.username ?? userInfo.first_name ?? 'Hunter',
      rank: 4,
      score: 2300,
      avatarUrl: 'https://i.pravatar.cc/150?img=2',
      isCurrentUser: true,
    },
    // Additional mock players up to rank 100
    ...Array.from({ length: 96 }, (_, i) => ({
      username: `Player${i + 4}`,
      rank: i + 5,
      score: Math.floor(Math.random() * 4000) + 1000,
      avatarUrl: `https://i.pravatar.cc/150?img=${(i + 6) % 70}`,
    })),
  ];
  return (
    <div className="min-h-screen bg-ocean-primary-medium px-4 pb-20 text-ocean-white">
      <div className="sticky top-0 mb-2 w-full bg-ocean-primary-medium py-4 text-center text-2xl font-bold">
        <Image
          className="h-auto w-full bg-firefly-radial object-contain"
          src="/leaderboard/leaderboard.png"
          alt="leaderboard"
          width={20000}
          height={20000}
        />
      </div>

      <div className="space-y-4">
        {leaderboard.map((player) => (
          <div
            key={player.rank}
            className={`flex items-center justify-between gap-3 rounded-lg p-2 shadow-lg ${
              player.rank === 1
                ? 'bg-yellow-500'
                : player.rank === 2
                  ? 'bg-gray-400'
                  : player.rank === 3
                    ? 'bg-orange-400'
                    : 'border bg-ocean-primary-medium text-sm'
            } ${player.isCurrentUser ? 'sticky top-44 border-4 border-green-500' : ''}`}
          >
            {player.rank > 0 && player.rank <= 3 ? (
              <div className="w-14">
                <Image
                  src={`/prize/prize-${player.rank}.png`}
                  alt={`Avatar of ${player.username}`}
                  className={`mx-auto object-contain ${player.rank === 3 ? 'w-8' : 'w-14'}`}
                  width={20000}
                  height={20000}
                />
              </div>
            ) : (
              <></>
            )}
            <div className="flex w-full items-center">
              <Image
                src={player.avatarUrl}
                alt={`Avatar of ${player.username}`}
                className={`rounded-full border-2 ${
                  player.rank === 1
                    ? 'h-16 w-16 border-yellow-300'
                    : player.rank === 2
                      ? 'h-16 w-16 border-gray-300'
                      : player.rank === 3
                        ? 'h-16 w-16 border-orange-300'
                        : 'h-10 w-10 border-ocean-white'
                }`}
                width={20000}
                height={20000}
              />
              <div className="ml-4 flex-1">
                <p
                  className={`${player.rank > 3 ? 'text-sm' : 'text-lg'} font-bold`}
                >
                  {player.username} {player.isCurrentUser && '(You)'}
                </p>
                <p className={`${player.rank > 3 ? 'text-xs' : 'text-sm'}`}>
                  Score: {player.score}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{`#${player.rank}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderboardTab;
