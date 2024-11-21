import React, { useEffect, useState } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import Image from 'next/image';

interface GameProgressBarProps {
  isComplete: boolean;
  onComplete: () => void;
}

const GameProgressBar = ({ isComplete, onComplete }: GameProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!isComplete) {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev)); // Faster increments up to 90%
      }, 100); // Faster interval
    } else {
      setProgress(100); // Complete to 100% when API is finished
      if (interval) clearInterval(interval);
    }

    if (progress === 100) {
      onComplete(); // Notify parent to hide the component
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isComplete, progress, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-gradient-to-b from-indigo-500 to-purple-600">
      <div className="w-3/4 max-w-md">
        <div className="mb-3 flex w-full flex-col items-center">
          <Image
            className="h-[40vh] w-fit bg-firefly-radial"
            src={`/logo/logo-diver.png`}
            alt="logo"
            width={20000}
            height={20000}
          />
        </div>
        <ProgressBar
          completed={progress}
          height="16px"
          isLabelVisible={true}
          bgColor="#10B981"
          baseBgColor="#4B5563"
          labelColor="#FFF"
        />
      </div>
    </div>
  );
};

export default GameProgressBar;
