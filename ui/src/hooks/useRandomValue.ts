import { IFishItem } from 'kan/types';

export const getRandomFish = (fishData: IFishItem[]) => {
  // Define a mapping for rarity to weights
  const rarityWeights: { [key: string]: number } = {
    common: 50,
    rare: 30,
    epic: 10,
    legendary: 10,
  };

  // Calculate cumulative weights
  const cumulativeWeights: number[] = [];
  let totalWeight = 0;

  fishData.forEach((fish) => {
    totalWeight += rarityWeights[fish.rarity];
    cumulativeWeights.push(totalWeight);
  });

  // Generate a random number up to the total weight
  const randomNum = Math.random() * totalWeight;

  // Find the fish based on the random number
  for (let i = 0; i < cumulativeWeights.length; i++) {
    if (randomNum < cumulativeWeights[i]) {
      return fishData[i];
    }
  }

  // Fallback in case of rounding errors
  return fishData[fishData.length - 1];
};
