"use client";
import React, { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faGamepad,
  faListCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import SpeciesBackground from "../SpeciesBackground";

function GameHome() {
  const [reward, setReward] = useState<string | null>(null);
  console.debug("reward: ", reward);
  const rewards = ["Shell", "Fish", "Treasure"];

  const handleTabClick = () => {
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    setReward(randomReward);
    alert(`You got ${randomReward}`);
  };

  // Function to handle tab class styling
  const getTabClasses = (selected: boolean) =>
    `${
      selected
        ? "bg-blue-500 text-white focus:outline-none"
        : "bg-white text-gray-700 hover:bg-gray-200 focus:outline-none"
    } px-4 py-2 w-full`;

  const onRenderTabs = () => {
    const tabList = [
      {
        name: "Game",
        icon: <FontAwesomeIcon icon={faGamepad} />,
      },
      {
        name: "Quest",
        icon: <FontAwesomeIcon icon={faListCheck} />,
      },
      {
        name: "Shop",
        icon: <FontAwesomeIcon icon={faCartShopping} />,
      },
      {
        name: "Profile",
        icon: <FontAwesomeIcon icon={faUser} />,
      },
    ];

    return tabList.map((tab) => (
      <Tab
        key={tab.name}
        className={({ selected }) =>
          `${getTabClasses(selected)} flex flex-col items-center py-3`
        }
      >
        {tab.icon}
        {tab.name}
      </Tab>
    ));
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-ocean bg-cover p-4">
      {/* Tabs Panel */}
      <TabGroup>
        <TabPanels className="flex-1 w-full h-full absolute top-0 left-0">
          <TabPanel className="flex flex-col justify-center items-center h-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Catch Rewards!</h2>
              <Image
                className="h-[35vh] mt-20 animate-pulse"
                src={"/diver.svg"}
                alt="diver"
                width={20000}
                height={20000}
              />
            </div>
          </TabPanel>

          <TabPanel className="flex justify-center items-center h-full">
            <h2 className="text-3xl text-yellow-300 font-bold">Quest</h2>
          </TabPanel>

          <TabPanel className="flex justify-center items-center h-full">
            <h2 className="text-3xl text-green-300 font-bold">Shop</h2>
          </TabPanel>

          <TabPanel className="flex justify-center items-center h-full">
            <h2 className="text-3xl text-purple-300 font-bold">Profile</h2>
          </TabPanel>
        </TabPanels>

        {/* Tabs List at the bottom */}
        <TabList className="fixed bottom-0 z-20 left-0 right-0 w-full flex bg-white/50 backdrop-blur-lg shadow-lg">
          {onRenderTabs()}
        </TabList>
      </TabGroup>

      <SpeciesBackground handleTabClick={handleTabClick} />
    </div>
  );
}

export default GameHome;
