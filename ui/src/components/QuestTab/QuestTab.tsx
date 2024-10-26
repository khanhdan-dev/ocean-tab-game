import React from 'react';

interface Quest {
  id: number;
  type: string;
  content: string;
  reward: number;
  level: number;
  status: 'go' | 'claim' | 'claimed';
}

const quests: Quest[] = [
  {
    id: 1,
    type: 'Daily',
    content: 'Win 3 matches',
    reward: 50,
    level: 1,
    status: 'claimed',
  },
  {
    id: 2,
    type: 'Weekly',
    content: 'Score 1000 points',
    reward: 200,
    level: 2,
    status: 'claim',
  },
  {
    id: 3,
    type: 'Special',
    content: 'Complete a tournament',
    reward: 500,
    level: 3,
    status: 'go',
  },
];

function QuestTab() {
  const totalQuestsDone = quests.filter(
    (quest) => quest.status === 'claimed',
  ).length;
  const totalRewardsCollected = quests
    .filter((quest) => quest.status === 'claimed')
    .reduce((acc, quest) => acc + quest.reward, 0);

  return (
    <div className="min-h-screen w-full bg-ocean-primary-medium p-4 text-ocean-white">
      <h1 className="mb-6 text-center text-2xl font-bold">Quests</h1>

      {/* Quest Summary */}
      <div className="mb-6 rounded-lg bg-ocean-blue p-4 shadow-lg">
        <p className="text-lg font-semibold">
          Total Quests Completed: {totalQuestsDone}
        </p>
        <p className="text-lg font-semibold">
          Total Rewards Collected: {totalRewardsCollected}
        </p>
      </div>

      {/* Quest List */}
      <div className="space-y-4">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className="rounded-lg bg-ocean-blue p-4 shadow-lg"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-bold">
                {quest.type} Quest - Level {quest.level}
              </p>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  quest.status === 'go'
                    ? 'bg-yellow-500 text-black'
                    : quest.status === 'claim'
                      ? 'bg-green-500 text-black'
                      : 'bg-gray-400 text-black'
                }`}
              >
                {quest.status === 'go'
                  ? 'Go'
                  : quest.status === 'claim'
                    ? 'Claim'
                    : 'Claimed'}
              </span>
            </div>
            <p className="mb-2 text-sm">{quest.content}</p>
            <p className="text-sm font-semibold">
              Reward: {quest.reward} coins
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestTab;
