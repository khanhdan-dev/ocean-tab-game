"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  handleTabClick: () => void;
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
  direction: "left" | "right"; // Direction of the fish movement
};

// Helper function to generate a random image path
const getRandomImage = (count: number) => {
  const randomIndex = Math.floor(Math.random() * count) + 1; // Generate random number between 1 and count
  return `/fish/fish-${randomIndex}.png`;
};

const createSpecies = (imageCount: number): Species => {
  const directions: Array<Species["direction"]> = ["left", "right"];
  const direction = directions[Math.floor(Math.random() * directions.length)];
  return {
    id: Math.random(),
    top: `${Math.random() * 100}%`,
    left: direction === "left" ? "0" : "unset",
    right: direction === "right" ? "0" : "unset",
    size: `${Math.random() * 20 + 30}px`, // Random size between 10px and 30px
    animationDuration: `${Math.random() * 5 + 5}s`, // Random speed between 5s and 10s
    animationDirection: Math.random() > 0.5 ? "normal" : "reverse", // Randomize direction
    species: getRandomImage(imageCount), // Use the helper to get a random fish image
    direction,
  };
};

const SpeciesBackground = ({ handleTabClick }: Props) => {
  const [species, setSpecies] = useState<Species[]>([]);

  // Use the useRandomImage hook to generate a random fish image
  useEffect(() => {
    const addSpeciesPeriodically = () => {
      const newSpecies = createSpecies(16); // Pass the number of fish images you have
      setSpecies((currentSpecies) => [
        ...currentSpecies.slice(-10), // Keep the last 14 species
        newSpecies,
      ]);
    };

    const interval = setInterval(addSpeciesPeriodically, 1000); // Add species every second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 z-10 h-full w-full overflow-hidden">
      {species.map((specie) => (
        <div
          key={specie.id}
          className="absolute"
          style={{
            top: specie.top,
            left: specie.left,
            right: -specie.right,
            animation: `move-${specie.direction} ${specie.animationDuration} forwards`,
          }}
          onClick={handleTabClick}
        >
          {/* Render the species as an image */}
          <Image
            src={specie.species}
            alt={`Species ${specie.id}`}
            className={`fish ${
              specie.direction === "left" ? "scale-x-100" : "-scale-x-100"
            }`} // Set the size of the species image
            width={20000}
            height={20000}
            style={{
              height: specie.size,
              width: "auto", // Set the size dynamically
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SpeciesBackground;
