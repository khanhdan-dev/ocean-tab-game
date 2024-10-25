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
import useUrlValidation from "kan/hooks/useUrlValidation";
import BubblesBackground from "../BubbleBackground";
import BackgroundAudio from "../BackgroundAudio";
import { useGetUserInfo } from "kan/hooks/useGetUserInfo";
import { ITelegramUserInfo } from "kan/types";

if (typeof window !== "undefined") {
  WebApp.ready();
}

interface Props {
  telegramUser: ITelegramUserInfo;
}

function GameHome({ telegramUser }: Props) {
  const { data: userInfo } = useGetUserInfo(telegramUser);
  const [reward, setReward] = useState<string | null>(null);
  const rewards = ["Shell", "Fish", "Token"];
  const [isOpenRewardDialog, setIsOpenRewardDialog] = useState(false);
  const [isOpenGreetingDialog, setIsOpenGreetingDialog] = useState(true);
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { validateUrl } = useUrlValidation();

  const handleTabClick = () => {
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    setReward(randomReward);
    setIsOpenRewardDialog(true);
  };

  // Function to handle tab class styling
  const getTabClasses = (selected: boolean) =>
    `${
      selected
        ? "bg-ocean-blue text-white focus:outline-none"
        : "bg-ocean-darkblue text-white hover:bg-gray-200 focus:outline-none"
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
          `${getTabClasses(selected)} ${
            isPlayingGame ? "hidden" : "flex"
          } flex-col items-center py-3 `
        }
      >
        {tab.icon}
      </Tab>
    ));
  };

  const handleCreateUser = () => {
    setIsOpenGreetingDialog(false);
  };

  const imageUrl =
    userInfo?.photo_url && validateUrl(userInfo?.photo_url)
      ? userInfo?.photo_url
      : "/diver/diver-avt.png"; // Default image if the URL is invalid

  if (!userInfo) {
    return <></>;
  }

  return (
    <div className="relative flex flex-col justify-center items-center h-[100dvh] bg-ocean bg-cover p-4">
      <dialog
        open={isOpenGreetingDialog}
        className="z-30 h-[100dvh] w-[90vw] mx-auto bg-transparent"
      >
        <div className="z-50 flex items-center h-full justify-center animate-shake">
          <div className="bg-blue-600 flex flex-col gap-3 items-center py-5 px-3 w-4/5 rounded-xl text-white">
            <div className="flex gap-4 items-center justify-between">
              <Image
                className="h-[20vh] w-auto bg-firefly-radial"
                src={`/diver/diver-greeting.png`}
                alt="diver"
                width={20000}
                height={20000}
              />
              <h2 className="font-semibold text-lg">
                {userInfo.isNewUser
                  ? `Welcome Back, ${
                      userInfo.first_name ?? userInfo.username ?? "you"
                    }!`
                  : `Welcome ${
                      userInfo.first_name ?? userInfo.username ?? "you"
                    } to the fantastic Journey!`}
              </h2>
            </div>
            <form method="dialog">
              <button
                className="px-3 py-1 bg-emerald-500 rounded-lg"
                onClick={handleCreateUser}
              >
                OK
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabPanels className="flex-1 w-full h-full absolute top-0 left-0">
          <TabPanel className="relative flex flex-col justify-center items-center h-full">
            {isPlayingGame ? (
              <>
                <div className="text-center flex flex-col justify-end h-[100dvh] pb-10 items-center">
                  <Image
                    className="h-[30vh] w-auto mt-20 animate-pulse"
                    src={"/diver/diver-default.png"}
                    alt="diver"
                    width={20000}
                    height={20000}
                  />
                </div>
                <div className="absolute top-3 left-3 z-20 right-3">
                  <div className="flex justify-between w-full gap-3 items-center">
                    <div className="bg-yellow-700 text-white h-10 w-10 flex justify-center items-center rounded-full">
                      <p>{userInfo.turns}</p>
                    </div>
                    <div
                      className="flex justify-end"
                      onClick={() => setIsPlayingGame(false)}
                    >
                      <Image
                        className="h-10 w-auto"
                        src={"/control/control-5.png"}
                        alt="diver"
                        width={20000}
                        height={20000}
                      />
                    </div>
                  </div>
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
              </>
            ) : (
              <div className="z-20">
                <div
                  className="absolute top-3 left-3 z-20 right-3 w-fit cursor-pointer hover:opacity-80 flex items-center gap-2 p-1 px-2 rounded-full bg-ocean-turquoise/50 backdrop-blur-sm text-white border border-white/20"
                  onClick={() => setSelectedIndex(3)}
                >
                  <Image
                    className="h-10 w-auto animate-shake"
                    src={imageUrl}
                    alt="diver"
                    width={20000}
                    height={20000}
                  />
                  <p className="pr-2">
                    Hi, {userInfo.first_name ?? userInfo.username ?? "Hunter"}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-20">
                  <Image
                    className="h-40 w-auto"
                    src={"/logo/logo.png"}
                    alt="diver"
                    width={20000}
                    height={20000}
                  />
                  <div onClick={() => setIsPlayingGame(!isPlayingGame)}>
                    <Image
                      className="h-20 w-auto animate-shake-infinite"
                      src={"/control/control-2.png"}
                      alt="diver"
                      width={20000}
                      height={20000}
                    />
                  </div>
                </div>
              </div>
            )}
            <BubblesBackground />
            <BackgroundAudio isPlayingGame={isPlayingGame} />
          </TabPanel>

          <TabPanel className="flex justify-center items-center h-full">
            <h2 className="text-3xl text-yellow-300 font-bold">Quest</h2>
          </TabPanel>

          <TabPanel className="flex justify-center items-center h-full">
            <h2 className="text-3xl text-green-300 font-bold">Shop</h2>
          </TabPanel>

          <TabPanel className="h-full bg-ocean-primary-medium text-white">
            <div className="p-3 border-b border-b-gray-300">
              <div
                className="cursor-pointer hover:opacity-80 flex w-fit items-center gap-2 px-2 rounded-full text-white"
                onClick={() => setSelectedIndex(3)}
              >
                <Image
                  className="h-10 w-auto animate-shake"
                  src={imageUrl}
                  alt="diver"
                  width={20000}
                  height={20000}
                />
                <p className="pr-2">
                  Hi, {userInfo.first_name ?? userInfo.username ?? "Hunter"}
                </p>
              </div>
            </div>
            <div className="p-3">
              {userInfo && (
                <>
                  ID: {userInfo.id} <br />
                  First Name: {userInfo.first_name} <br />
                  Last Name: {userInfo.last_name} <br />
                  Username: {userInfo.username} <br />
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
