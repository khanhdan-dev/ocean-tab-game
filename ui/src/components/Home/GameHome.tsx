"use client";
import React, { useEffect, useState } from "react";
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
import WebApp from "@twa-dev/sdk";
import { ITelegramUserInfo } from "kan/types";

if (typeof window !== "undefined") {
  WebApp.ready();
}

function GameHome() {
  const [reward, setReward] = useState<string | null>(null);
  const rewards = ["Shell", "Fish", "Token"];
  const [isOpenRewardDialog, setIsOpenRewardDialog] = useState(false);
  const initialUserData: ITelegramUserInfo = {
    id: 1,
    first_name: "",
    last_name: "",
    username: "",
    photo_url: "",
    auth_date: "",
    hash: "",
  };
  const [user, setUser] = useState<ITelegramUserInfo>(initialUserData);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabClick = () => {
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    setReward(randomReward);
    setIsOpenRewardDialog(true);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userInfo = WebApp.initDataUnsafe?.user as ITelegramUserInfo;

      if (userInfo) {
        setUser(userInfo);
      }
    }
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center h-[100dvh] bg-ocean bg-cover p-4">
      {/* Tabs Panel */}
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabPanels className="flex-1 w-full h-full absolute top-0 left-0">
          <TabPanel className="relative flex flex-col justify-center items-center h-full">
            <div
              className="absolute top-3 left-3 z-20 cursor-pointer hover:opacity-80 flex items-center gap-2 p-1 rounded-full bg-blue-500 text-white border border-white/20"
              onClick={() => setSelectedIndex(3)}
            >
              {user.photo_url && user.photo_url !== "" ? (
                <Image
                  className="h-14 w-auto mt-20 animate-pulse"
                  src={"/diver/diver-default.png"}
                  alt="diver"
                  width={20000}
                  height={20000}
                />
              ) : (
                <div className="h-7 w-7 font-semibold text-white rounded-full bg-orange-400 flex justify-center items-center">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              )}
              <p className="pr-2">Hi, {user.username}</p>
            </div>
            <div className="text-center flex flex-col justify-between h-[100dvh] py-24 items-center">
              <h2 className="text-3xl font-bold text-white">Ocean Tab Game</h2>
              <Image
                className="h-[30vh] w-auto mt-20 animate-pulse"
                src={"/diver/diver-default.png"}
                alt="diver"
                width={20000}
                height={20000}
              />
            </div>
            <dialog
              open={isOpenRewardDialog}
              className="z-20 h-[100dvh] w-[90vw] mx-auto bg-transparent"
            >
              <div className="flex items-center h-full justify-center animate-shake">
                <div className="bg-blue-600 flex flex-col gap-3 items-center py-5 w-4/5 rounded-xl text-white">
                  <div className="flex items-center flex-col gap-5">
                    <Image
                      className="h-[20vh] w-auto bg-firefly-radial"
                      src={`/diver/diver-${reward?.toLowerCase()}.png`}
                      alt="diver"
                      width={20000}
                      height={20000}
                    />
                    <p>Wonderful! You got a {reward}</p>
                  </div>
                  <form method="dialog">
                    <button
                      className="px-3 py-1 bg-emerald-500 rounded-lg"
                      onClick={() => setIsOpenRewardDialog(false)}
                    >
                      OK
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
            <SpeciesBackground
              handleTabClick={handleTabClick}
              isOpenRewardDialog={isOpenRewardDialog}
            />
          </TabPanel>

          <TabPanel className="flex justify-center items-center h-full">
            <h2 className="text-3xl text-yellow-300 font-bold">Quest</h2>
          </TabPanel>

          <TabPanel className="flex justify-center items-center h-full">
            <h2 className="text-3xl text-green-300 font-bold">Shop</h2>
          </TabPanel>

          <TabPanel className="h-full bg-blue-900">
            <div className="p-3 border-b border-b-gray-300">
              <div className="flex items-center gap-2 p-1 text-white">
                {user.photo_url && user.photo_url !== "" ? (
                  <Image
                    className="h-14 w-auto mt-20 animate-pulse"
                    src={"/diver/diver-default.png"}
                    alt="diver"
                    width={20000}
                    height={20000}
                  />
                ) : (
                  <div className="h-7 w-7 text-white rounded-full bg-orange-400 flex justify-center items-center">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <p className="">Hi, {user.username}</p>
              </div>
            </div>
            <div className="p-3">
              {user && (
                <>
                  ID: {user.id} <br />
                  First Name: {user.first_name} <br />
                  Last Name: {user.last_name} <br />
                  Username: {user.username} <br />
                  Hash: {user.photo_url}
                </>
              )}
            </div>
          </TabPanel>
        </TabPanels>

        {/* Tabs List at the bottom */}
        <TabList className="fixed bottom-0 z-20 left-0 right-0 w-full flex bg-white/50 backdrop-blur-lg shadow-lg">
          {onRenderTabs()}
        </TabList>
      </TabGroup>
    </div>
  );
}

export default GameHome;
