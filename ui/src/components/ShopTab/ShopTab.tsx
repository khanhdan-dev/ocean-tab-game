import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react';

interface ShopItem {
  id: number;
  name: string;
  type: 'equipment' | 'skin' | 'skill';
  price: number;
  imageUrl: string;
  description: string;
}

const shopItems: ShopItem[] = [
  {
    id: 1,
    name: 'Advanced Diving Suit',
    type: 'equipment',
    description: 'Allows the diver to stay underwater for longer durations.',
    price: 500,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Reinforced Fishing Net',
    type: 'equipment',
    description:
      'Increases the chances of catching larger fish and more shells.',
    price: 350,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Harpoon Gun',
    type: 'equipment',
    description: 'Enables the diver to catch rare fish with precision.',
    price: 600,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Swim Faster',
    type: 'skill',
    description:
      "Boosts the diver's swimming speed, making it easier to escape predators.",
    price: 300,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Deep Dive',
    type: 'skill',
    description:
      'Allows the diver to explore deeper parts of the ocean where more treasures are found.',
    price: 700,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    name: 'Sonar Vision',
    type: 'skill',
    description: 'Reveals hidden treasures and fish locations.',
    price: 450,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 7,
    name: 'Golden Spear',
    type: 'equipment',
    description:
      'A special spear that increases the catch rate of rare sea creatures.',
    price: 800,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 8,
    name: 'Shark Repellent',
    type: 'equipment',
    description: 'Keeps dangerous predators away for a limited time.',
    price: 400,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 9,
    name: 'Marine Camouflage Suit',
    type: 'skin',
    description:
      'Blends in with underwater surroundings to avoid detection by predators.',
    price: 550,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 10,
    name: 'Octopus Tentacle Whip',
    type: 'equipment',
    description: 'A unique tool used to fend off sea creatures and obstacles.',
    price: 500,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 11,
    name: 'Treasure Detector',
    type: 'skill',
    description: 'Helps locate hidden treasures buried under the sand.',
    price: 600,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 12,
    name: 'Sea Dragon Skin',
    type: 'skin',
    description:
      'Transforms the diver’s appearance into a majestic sea dragon.',
    price: 1000,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 13,
    name: 'Coral Shield',
    type: 'equipment',
    description: 'Protects the diver from harmful sea creatures.',
    price: 650,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 14,
    name: 'Bubble Jetpack',
    type: 'equipment',
    description:
      'Allows quick ascents to the surface by using compressed air bubbles.',
    price: 750,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 15,
    name: 'Electric Eel Skill',
    type: 'skill',
    description:
      'Unleashes a shockwave that temporarily stuns nearby sea creatures.',
    price: 700,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 16,
    name: 'Whale Song Skin',
    type: 'skin',
    description: 'Changes the diver’s appearance to mimic the look of a whale.',
    price: 950,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 17,
    name: 'Glow-in-the-Dark Suit',
    type: 'skin',
    description:
      'Illuminates dark underwater areas, allowing better visibility.',
    price: 800,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 18,
    name: 'Triton’s Trident',
    type: 'equipment',
    description:
      'An ancient weapon that increases the power of all underwater attacks.',
    price: 1200,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 19,
    name: 'Crab Armor',
    type: 'skin',
    description:
      'Turns the diver into a crab-like creature, providing extra protection.',
    price: 700,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 20,
    name: 'Water Bending Skill',
    type: 'skill',
    description:
      'Enables control over water currents, making exploration easier.',
    price: 900,
    imageUrl: 'https://via.placeholder.com/150',
  },
];

function ShopTab() {
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [userCoins, setUserCoins] = useState(1000);
  const [userFish, setUserFish] = useState(50);
  const [userShells, setUserShells] = useState(30);

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

    if (type === 'fish') {
      setUserCoins(userCoins + coinsEarned);
      setUserFish(0);
    } else {
      setUserCoins(userCoins + coinsEarned);
      setUserShells(0);
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
            className="bg-ocean-primary-light flex cursor-pointer flex-col items-center rounded-lg"
            onClick={() => setSelectedItem(item)}
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              className="h-20 w-20 rounded-lg"
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
