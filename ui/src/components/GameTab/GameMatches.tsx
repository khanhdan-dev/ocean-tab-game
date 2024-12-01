import React from 'react';
import HabitatSwiper from '../Swipers/HabitatSwiper';
import { Pirata_One } from '@next/font/google';
import { IFishItem } from 'kan/types';

const pirataOne = Pirata_One({ subsets: ['latin'], weight: '400' });

interface Props {
  handleCloseGameMatches: (habitatType: IFishItem['habitat'] | null) => void;
  currentHabitat: IFishItem['habitat'] | null;
}

function GameMatches({ handleCloseGameMatches, currentHabitat }: Props) {
  return (
    <div className="h-[100dvh] w-[100dvw] bg-ocean-primary-medium py-5 pb-10 text-center">
      <div className="mb-6">
        <h1
          className={`${pirataOne.className} mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400 bg-clip-text text-center text-5xl text-transparent`}
        >
          Ocean Adventure
        </h1>
        <p className="glow-effect text-center text-lg text-teal-200">
          Journey into your ideal habitat!
        </p>
      </div>
      <HabitatSwiper
        handleCloseGameMatches={handleCloseGameMatches}
        currentHabitat={currentHabitat}
      />
    </div>
  );
}

export default GameMatches;
