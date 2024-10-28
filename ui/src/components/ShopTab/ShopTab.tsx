import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react';
import { ShopItem, shopItems } from './shopItems';
import { ITelegramUserInfo } from 'kan/types';
import { usePutUpdateUser } from 'kan/hooks/usePutUpdateUser';

interface Props {
  userInfo: ITelegramUserInfo;
}

function ShopTab({ userInfo }: Props) {
  const { mutate: putUpdateUserMutate } = usePutUpdateUser();
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
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
            className="h-6 w-auto rounded-lg"
            width={20000}
            height={20000}
          />
          <p className="font-semibold text-ocean-yellow">{r.value}</p>
        </div>
      );
    });
  };

  return (
    <div className="h-full min-h-[100dvh] overflow-auto bg-ocean-primary-medium p-4 pb-20 text-ocean-white">
      {/* User's Coin, Fish, and Shells Balance */}
      <div className="mb-4">
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

      <h2 className="mb-3 text-3xl font-semibold text-ocean-flashturq">Shop</h2>
      {/* Shop Items */}
      <div className="grid grid-cols-3 gap-4 overflow-auto">
        {shopItems.map((item) => (
          <div
            key={item.id}
            className="bg-ocean-primary-light flex cursor-pointer flex-col items-center gap-1 rounded-lg"
            onClick={() => setSelectedItem(item)}
          >
            <Image
              src={`/shop/item-${item.id}.png`}
              alt={item.name}
              className="h-16 w-16 rounded-lg"
              width={20000}
              height={20000}
            />
            <p className="mt-2 text-center text-sm font-bold">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Item Details Popup */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-4/5 rounded-lg bg-ocean-primary-medium p-6">
            <h2 className="text-xl font-bold text-ocean-flashturq">
              {selectedItem.name}
            </h2>
            <p className="mt-2">{selectedItem.description}</p>
            <p className="mt-2">Price: {selectedItem.price} coins</p>

            <p className="flex justify-end font-bold text-ocean-flashgreen">
              {selectedItem.price * quantity} coins
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
