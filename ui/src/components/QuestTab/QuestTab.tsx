import Image from 'next/image';
import React from 'react';

interface Quest {
  id: number;
  type: 'Daily' | 'Weekly' | 'Special';
  content: string;
  reward: number;
  status: 'go' | 'claim' | 'claimed';
}

const quests: Quest[] = [
  {
    id: 1,
    type: 'Daily',
    content: 'Win 3 matches',
    reward: 50,
    status: 'claimed',
  },
  {
    id: 2,
    type: 'Weekly',
    content: 'Score 1000 points',
    reward: 200,
    status: 'claim',
  },
  {
    id: 3,
    type: 'Special',
    content: 'Complete a tournament',
    reward: 500,
    status: 'go',
  },
  {
    id: 4,
    type: 'Daily',
    content: 'Collect 10 shells',
    reward: 30,
    status: 'go',
  },
  {
    id: 5,
    type: 'Daily',
    content: 'Catch 5 rare fish',
    reward: 70,
    status: 'claim',
  },
  {
    id: 6,
    type: 'Weekly',
    content: 'Reach level 5',
    reward: 250,
    status: 'go',
  },
  {
    id: 7,
    type: 'Weekly',
    content: 'Complete 5 daily quests',
    reward: 300,
    status: 'claim',
  },
  {
    id: 8,
    type: 'Special',
    content: 'Defeat a legendary sea monster',
    reward: 1000,
    status: 'go',
  },
  {
    id: 9,
    type: 'Special',
    content: 'Participate in a special event',
    reward: 800,
    status: 'claim',
  },
  {
    id: 10,
    type: 'Daily',
    content: 'Log in for 3 consecutive days',
    reward: 40,
    status: 'claimed',
  },
];

function QuestTab() {
  const renderQuestsByType = (type: 'Daily' | 'Weekly' | 'Special') =>
    quests
      .filter((quest) => quest.type === type)
      .map((quest) => (
        <div
          key={quest.id}
          className={`rounded-lg p-2 shadow-md ${quest.type === 'Daily' ? 'bg-ocean-white text-ocean-darkblue' : quest.type === 'Weekly' ? 'bg-ocean-blue' : 'bg-violet-600'}`}
        >
          <div className="mb-1 flex items-center justify-between">
            <div>
              <p className="text-xs">{quest.content}</p>
              <p className="text-xs font-semibold">
                Reward: {quest.reward} coins
              </p>
            </div>
            <button
              className={`rounded-full px-2 py-0.5 text-xs ${
                quest.status === 'go'
                  ? 'bg-ocean-yellow text-black'
                  : quest.status === 'claim'
                    ? 'bg-ocean-flashturq text-black'
                    : 'bg-ocean-lightgrey text-black'
              }`}
            >
              {quest.status === 'go'
                ? 'Go'
                : quest.status === 'claim'
                  ? 'Claim'
                  : 'Claimed'}
            </button>
          </div>
        </div>
      ));

  return (
    <div className="h-full min-h-[100dvh] w-full overflow-auto bg-ocean-primary-medium p-4 pb-24 text-ocean-white">
      <Image
        className="mx-auto mb-2 h-20 w-fit bg-firefly-radial object-contain"
        src="/quest/quest.png"
        alt="quest"
        width={20000}
        height={20000}
      />

      {/* Quest Summary */}
      <div className="mb-6 rounded-lg bg-ocean-yellow p-4 text-ocean-primary-medium shadow-lg">
        <p className="text-sm font-semibold">
          Total Quests Completed:{' '}
          {quests.filter((quest) => quest.status === 'claimed').length}
        </p>
        <p className="text-sm font-semibold">
          Total Rewards Collected:{' '}
          {quests
            .filter((quest) => quest.status === 'claimed')
            .reduce((acc, quest) => acc + quest.reward, 0)}
        </p>
      </div>

      {/* Quest Sections */}
      <div className="space-y-4">
        <div>
          <h2 className="mb-2 text-sm font-bold">Daily Quests</h2>
          <div className="space-y-2">{renderQuestsByType('Daily')}</div>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-bold">Weekly Quests</h2>
          <div className="space-y-2">{renderQuestsByType('Weekly')}</div>
        </div>
        <div>
          <h2 className="mb-2 text-sm font-bold">Special Quests</h2>
          <div className="space-y-2">{renderQuestsByType('Special')}</div>
        </div>
      </div>
    </div>
  );
}

export default QuestTab;
