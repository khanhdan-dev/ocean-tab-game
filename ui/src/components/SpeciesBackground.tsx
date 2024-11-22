'use client';
import { IFishItem, ITelegramUserInfo } from 'kan/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { GiFishingNet } from 'react-icons/gi';
import { fishData } from 'kan/utils/fishData';

interface Props {
  handleTabClick: () => void;
  isOpenRewardDialog: boolean;
  userInfo: ITelegramUserInfo;
  reward: string | null;
  currentTurns: number;
}

type Species = {
  id: number;
  top: string;
  left: string;
  right: string;
  size: string;
  animationDuration: string;
  animationDirection: string;
  species: string; // URL of the species image
  direction: 'left' | 'right'; // Direction of the fish movement
  hp: number;
  requiredAttacks: number;
};

// Helper function to generate a random image path
// const getRandomImage = (count: number) => {
//   const randomIndex = Math.floor(Math.random() * count) + 1; // Generate random number between 1 and count
//   return `/fish/fish-${randomIndex}.png`;
// };

// Helper function to generate a random image path
const getRandomFish = (count: number) => {
  const randomIndex = Math.floor(Math.random() * count) + 1; // Generate random number between 1 and count
  return fishData[randomIndex - 1];
};

const getSize = (size: IFishItem['size']) => {
  switch (size) {
    case 'small':
      return 0.5;

    case 'medium':
      return 1;

    case 'large':
      return 1.5;

    default:
      return 0.5;
  }
};

const createSpecies = (imageCount: number): Species => {
  const directions: Array<Species['direction']> = ['left', 'right'];
  const direction = directions[Math.floor(Math.random() * directions.length)];
  const fish = getRandomFish(imageCount);

  return {
    id: Math.random(),
    top: `${Math.random() * 100}%`,
    left: direction === 'left' ? '0' : 'unset',
    right: direction === 'right' ? '0' : 'unset',
    size: `${getSize(fish.size) * 20 + 30}px`, // Random size between 10px and 30px
    animationDuration: `${Math.random() * 5 + 5}s`, // Random speed between 5s and 10s
    animationDirection: Math.random() > 0.5 ? 'normal' : 'reverse', // Randomize direction
    species: fish.image, // Use the helper to get a random fish image
    direction,
    hp: fish.hp,
    requiredAttacks: fish.requiredAttacks,
  };
};

const SpeciesBackground = ({ handleTabClick, isOpenRewardDialog }: Props) => {
  const [species, setSpecies] = useState<Species[]>([]);
  const initialCaughtFish = {
    id: 0,
    isCaught: false,
  };
  const [caughtFish, setCaughtFish] = useState(initialCaughtFish);

  useEffect(() => {
    if (!isOpenRewardDialog) {
      setSpecies(species.filter((s) => s.id !== caughtFish.id));
      setCaughtFish(initialCaughtFish);
    }
  }, [isOpenRewardDialog]);

  // Use the useRandomImage hook to generate a random fish image
  useEffect(() => {
    const addSpeciesPeriodically = () => {
      const newSpecies = createSpecies(16); // Pass the number of fish images you have
      setSpecies((currentSpecies) => [
        ...currentSpecies.slice(-10), // Keep the last 14 species
        newSpecies,
      ]);
    };

    if (!caughtFish.isCaught) {
      const interval = setInterval(addSpeciesPeriodically, 1000); // Add species every second
      return () => clearInterval(interval); // Clean up the interval on unmount
    }
  }, [caughtFish.isCaught]);

  const handleCatchFish = (specie: Species) => {
    setSpecies((currentSpecies) =>
      currentSpecies.map((s) =>
        s.id === specie.id
          ? {
              ...s,
              requiredAttacks: s.requiredAttacks - 1,
            }
          : s,
      ),
    );

    const updatedFish = species.find((s) => s.id === specie.id);
    if (updatedFish?.requiredAttacks === 1) {
      const clickSound = new Audio('/sounds/reward.mp3'); // Path to your sound file
      clickSound.play(); // Play the sound
      setCaughtFish({
        id: specie.id,
        isCaught: true,
      });
      setTimeout(() => {
        handleTabClick();
      }, 200);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10 h-full w-full overflow-hidden">
      {species.map((specie) => (
        <button
          disabled={caughtFish.isCaught}
          key={specie.id}
          className="absolute cursor-pointer"
          style={{
            top: specie.top,
            left: specie.left,
            right: !isNaN(Number(specie.right)) ? -specie.right : 'unset',
            animation: `move-${specie.direction} ${specie.animationDuration} forwards`,
            animationPlayState:
              caughtFish.id === specie.id && caughtFish.isCaught
                ? 'paused'
                : 'running',
          }}
          onClick={() => handleCatchFish(specie)}
        >
          <div className="flex flex-col items-center">
            <Image
              src={specie.species}
              alt={`Species ${specie.id}`}
              className={`fish ${
                specie.direction === 'left' ? 'scale-x-100' : '-scale-x-100'
              }`}
              width={20000}
              height={20000}
              style={{
                height: specie.size,
                width: 'auto',
              }}
            />
            <div
              className={`${specie.hp === specie.requiredAttacks ? 'hidden' : ''} animate-showHp h-2 rounded-full bg-ocean-flashturq bg-opacity-25 bg-firefly-radial brightness-200 backdrop-blur-md`}
              style={{
                width: specie.hp * 10,
              }}
            >
              <div
                className={`h-2 rounded-full bg-ocean-flashred bg-opacity-85 backdrop-blur-md`}
                style={{
                  width: specie.requiredAttacks * 10,
                }}
              ></div>
            </div>
          </div>

          {specie.requiredAttacks === 0 && (
            <GiFishingNet
              className="absolute inset-0 m-auto animate-wrap-net font-thin text-gray-200"
              style={{
                height: `calc(${specie.size} + 50px)`,
                width: 'auto', // Set the size dynamically
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default SpeciesBackground;
