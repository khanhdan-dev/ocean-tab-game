import { IFishItem } from 'kan/types';
import React from 'react';

interface HabitatTitleProps {
  title: IFishItem['habitat'];
  subtitle: string;
  fontClass: string;
  isActive: boolean; // Track if the title is active
  onClick: () => void; // Handle click event
  handleCloseGameMatches: (habitatType: IFishItem['habitat'] | null) => void;
}

function HabitatTitle({
  title,
  subtitle,
  fontClass,
  isActive,
  onClick,
  handleCloseGameMatches,
}: HabitatTitleProps) {
  return (
    <div
      className="group absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-t from-black/70 to-transparent p-4 text-center text-white"
      onClick={onClick}
    >
      <h1
        className={`${fontClass} text-4xl font-bold drop-shadow-lg md:text-5xl`}
      >
        {title}
      </h1>
      <div
        className={`${
          isActive
            ? 'translate-y-0 opacity-100'
            : 'translate-y-[20rem] opacity-0'
        } translate-all transition-all duration-500 ease-in-out md:translate-y-[20rem] md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100`}
      >
        <p className="mt-2 text-sm drop-shadow-md md:text-lg">{subtitle}</p>
        <button
          onClick={() => {
            localStorage.setItem('habitat', title);
            handleCloseGameMatches(title);
          }}
          className="mt-4 rounded-md bg-ocean-blue px-6 py-2 text-sm font-medium text-white shadow-md transition-colors hover:brightness-125"
        >
          Dive In
        </button>
      </div>
    </div>
  );
}

export default HabitatTitle;
