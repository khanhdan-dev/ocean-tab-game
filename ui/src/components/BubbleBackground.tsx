'use client';
import { getImageSrc } from 'kan/utils/getImageSrc';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Bubble = {
  id: number;
  top: string;
  left: string;
  animationDuration: string;
  size: string;
  bubble: string;
};

const getRandomBubble = (count: number) => {
  const randomIndex = Math.floor(Math.random() * count) + 1; // Generate random number between 1 and count
  return getImageSrc(`/bubble/bubble-${randomIndex}.png`);
};

const createBubble = (imageCount: number): Bubble => ({
  id: Math.random(),
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDuration: `${Math.random() * 5 + 5}s`,
  size: `${Math.random() * 20 + 30}px`,
  bubble: getRandomBubble(imageCount),
});

const BubblesBackground: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const addBubblePeriodically = () => {
      const newBubble = createBubble(9);
      setBubbles((currentBubbles) => [...currentBubbles.slice(-4), newBubble]);
    };

    const interval = setInterval(addBubblePeriodically, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute animate-bubble rounded-full"
          style={{
            top: bubble.top,
            left: bubble.left,
          }}
        >
          <Image
            src={bubble.bubble}
            alt={`bubbles ${bubble.id}`}
            width={20000}
            height={20000}
            style={{
              height: 'auto',
              width: bubble.size, // Set the size dynamically
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default BubblesBackground;
