import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react';
import { ShopItem, shopItems } from './shopItems';
import { ITelegramUserInfo } from 'kan/types';
import { usePutUpdateUser } from 'kan/hooks/usePutUpdateUser';
import { TabGroup, TabPanels, TabPanel, TabList, Tab } from '@headlessui/react';
import { GiSpearfishing } from 'react-icons/gi';
import { MdOutlineScubaDiving } from 'react-icons/md';
import { FaShop } from 'react-icons/fa6';

interface Props {
  userInfo: ITelegramUserInfo;
}

function ShopTab({ userInfo }: Props) {
  const { mutate: putUpdateUserMutate } = usePutUpdateUser();
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  console.log('selectedItem: ', selectedItem);
  const [quantity, setQuantity] = useState(1);
  const [userCoins, setUserCoins] = useState(userInfo.resources.coins);
  const [userFish, setUserFish] = useState(userInfo.resources.fish);
  const [userShells, setUserShells] = useState(userInfo.resources.shells);

  const handleBuyItem = () => {
    if (selectedItem) {
      const totalCost = selectedItem.price * quantity;
      if (userCoins >= totalCost) {
        setUserCoins(userCoins - totalCost);
        alert(`You bought ${quantity} ${selectedItem.name}(s)!`);
        setSelectedItem(null);
        setQuantity(1);
      } else {
        alert('Not enough coins to complete the purchase.');
      }
    }
  };

  const convertToCoins = (type: 'fish' | 'shells') => {
    const conversionRate = type === 'fish' ? 10 : 20;
    const amount = type === 'fish' ? userFish : userShells;
    const coinsEarned = amount * conversionRate;
    const newRewardObj = {
      shells: 0,
      coins: 0,
      fish: 0,
    };

    if (type === 'fish') {
      setUserCoins(userCoins + coinsEarned);
      setUserFish(0);

      const resources = userInfo.resources
        ? {
            ...userInfo.resources,
            coins: userCoins + coinsEarned,
            fish: 0,
          }
        : { ...newRewardObj, coins: userCoins + coinsEarned, fish: 0 };

      putUpdateUserMutate({
        userId: String(userInfo.id),
        user: { resources },
      });
    } else {
      setUserCoins(userCoins + coinsEarned);
      setUserShells(0);

      const resources = userInfo.resources
        ? {
            ...userInfo.resources,
            coins: userCoins + coinsEarned,
            shells: 0,
          }
        : { ...newRewardObj, coins: userCoins + coinsEarned, shells: 0 };

      putUpdateUserMutate({
        userId: String(userInfo.id),
        user: { resources },
      });
    }
  };

  const onRenderUserRewards = () => {
    const rewardList = [
      {
        name: 'Coin',
        value: userCoins,
      },
      {
        name: 'Fish',
        value: userFish,
      },
      {
        name: 'Shell',
        value: userShells,
      },
    ];
    return rewardList.map((r) => {
      return (
        <div key={r.name} className="flex items-center gap-2 text-sm">
          <Image
            src={`/resources/${r.name.toLowerCase()}.png`}
            alt={r.name}
            className="h-4 w-auto rounded-lg"
            width={20000}
            height={20000}
          />
          <p className="font-semibold text-ocean-yellow">{r.value}</p>
        </div>
      );
    });
  };

  const getTabClasses = (selected: boolean) =>
    `${
      selected
        ? 'text-ocean-flashturq focus:outline-none'
        : 'text-white hover:bg-gray-200 focus:outline-none'
    } px-3 py-2 w-full font-semibold text-sm`;

  const onRenderTabs = () => {
    const tabList = [
      {
        name: 'All',
        icon: <FaShop />,
      },
      {
        name: 'Skills',
        icon: <GiSpearfishing />,
      },
      {
        name: 'Equipments',
        icon: <MdOutlineScubaDiving />,
      },
    ];

    return tabList.map((tab) => (
      <Tab
        key={tab.name}
        className={({ selected }) => `${getTabClasses(selected)}`}
      >
        <div className="flex items-center justify-end gap-1 hover:bg-ocean-darkblue">
          {tab.icon}
          <p>{tab.name}</p>
        </div>
      </Tab>
    ));
  };

  const onRenderProducts = (items: ShopItem[]) => {
    return (
      <div className="mt-2 grid grid-cols-3 gap-3 overflow-auto rounded-md bg-ocean-lightgrey p-2 py-4 text-ocean-white">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-ocean-primary-light relative flex cursor-pointer flex-col items-center gap-1 overflow-hidden rounded-lg border border-ocean-primary-medium bg-ocean-primary-medium p-1"
            onClick={() => setSelectedItem(item)}
          >
            <Image
              src={`/shop/item-${item.id}.png`}
              alt={item.name}
              className="mt-5 h-16 w-16 rounded-lg object-contain py-2 drop-shadow-[0px_10px_5px_#47c9af]"
              width={20000}
              height={20000}
            />
            <p className="mt-2 text-center text-sm font-bold">{item.name}</p>
            <div className="absolute right-0 top-0 rounded-bl-xl bg-ocean-orange px-2 py-1 text-xs font-semibold capitalize">
              {item.type}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full min-h-[100dvh] overflow-auto bg-ocean-primary-medium p-4 pb-20 text-ocean-white">
      {/* User's Coin, Fish, and Shells Balance */}
      <div className="flex items-center justify-between gap-3">
        <Image
          className="h-48 w-auto bg-firefly-radial object-contain"
          src="/shop/skin/skin-1.png"
          alt="diver"
          width={20000}
          height={20000}
        />
        <div className="flex flex-col items-center justify-center gap-1">
          <Image
            className="h-auto w-full bg-firefly-radial object-contain px-3 pb-2"
            src="/shop/shop.png"
            alt="shop"
            width={20000}
            height={20000}
          />
          <div className="flex gap-2">{onRenderUserRewards()}</div>
          <div className="my-2 flex items-center gap-2">
            <button
              className="flex items-center gap-2 rounded bg-ocean-turquoise px-2 py-1 font-semibold text-ocean-white"
              onClick={() => convertToCoins('fish')}
            >
              <Image
                src={`/resources/fish.png`}
                alt="fish convert"
                className="h-5 w-auto rounded-lg"
                width={20000}
                height={20000}
              />
              to
              <Image
                src={`/resources/coin.png`}
                alt="coin convert"
                className="h-5 w-auto rounded-lg"
                width={20000}
                height={20000}
              />
            </button>
            <button
              className="flex items-center gap-2 rounded bg-ocean-turquoise px-2 py-1 font-semibold text-ocean-white"
              onClick={() => convertToCoins('shells')}
            >
              <Image
                src={`/resources/shell.png`}
                alt="shell convert"
                className="h-5 w-auto rounded-lg"
                width={20000}
                height={20000}
              />
              to
              <Image
                src={`/resources/coin.png`}
                alt="coin convert"
                className="h-5 w-auto rounded-lg"
                width={20000}
                height={20000}
              />
            </button>
          </div>
        </div>
      </div>
      <TabGroup className="mt-5">
        {/* Tabs List at the bottom */}
        <TabList className="z-20 mx-auto flex w-fit rounded-lg border-[1px] border-ocean-lightgrey/30 bg-ocean-darkblue shadow-lg backdrop-blur-lg">
          {onRenderTabs()}
        </TabList>
        <TabPanels className="h-full w-full flex-1">
          <TabPanel className="flex h-full items-center justify-center">
            {onRenderProducts(shopItems)}
          </TabPanel>
          <TabPanel className="h-full w-full flex-1">
            {onRenderProducts(shopItems.filter((i) => i.type === 'skill'))}
          </TabPanel>
          <TabPanel className="h-full w-full flex-1">
            {onRenderProducts(shopItems.filter((i) => i.type === 'equipment'))}
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {/* Item Details Popup */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-4/5 rounded-lg bg-ocean-primary-medium p-6">
            <h2 className="text-xl font-bold text-ocean-flashturq">
              {selectedItem.name}
            </h2>
            <p className="mt-2">{selectedItem.description}</p>
            <p className="mt-2">Price: {selectedItem.price} Azuryth</p>

            <p className="flex justify-end font-bold text-ocean-flashgreen">
              {selectedItem.price * quantity} Azuryth
            </p>
            <div className="mt-4 flex h-full w-full justify-stretch overflow-hidden rounded">
              <input
                type="number"
                id="quantity"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="w-12 border p-1 text-black"
              />
              <button
                className="m-auto w-full bg-ocean-flashturq px-4 py-2 font-bold text-black"
                onClick={handleBuyItem}
              >
                Buy
              </button>
            </div>

            <FontAwesomeIcon
              icon={faClose}
              className="absolute right-2 top-2 text-3xl text-ocean-white"
              onClick={() => setSelectedItem(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopTab;
