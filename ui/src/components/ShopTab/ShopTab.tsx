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
        name: 'Coins',
        value: userCoins,
      },
      {
        name: 'Fish',
        value: userFish,
      },
      {
        name: 'Shells',
        value: userShells,
      },
    ];
    return rewardList.map((r) => {
      return (
        <p key={r.name}>
          {r.name}: {r.value}
        </p>
      );
    });
  };

  return (
    <div className="h-full min-h-[100dvh] overflow-auto bg-ocean-primary-medium p-4 pb-20 text-ocean-white">
      <h1 className="mb-6 text-center text-2xl font-bold">Shop</h1>

      {/* User's Coin, Fish, and Shells Balance */}
      <div className="mb-4">
        <div className="flex gap-2">{onRenderUserRewards()}</div>
        <button
          className="m-2 rounded bg-ocean-flashturq px-4 py-1 text-black"
          onClick={() => convertToCoins('fish')}
        >
          Convert Fish to Coins
        </button>
        <button
          className="m-2 rounded bg-ocean-flashturq px-4 py-1 text-black"
          onClick={() => convertToCoins('shells')}
        >
          Convert Shells to Coins
        </button>
      </div>

      {/* Shop Items */}
      <div className="grid grid-cols-3 gap-4 overflow-auto">
        {shopItems.map((item) => (
          <div
            key={item.id}
            className="bg-ocean-primary-light flex cursor-pointer flex-col items-center rounded-lg"
            onClick={() => setSelectedItem(item)}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="h-20 w-20 rounded-lg"
            />
            <p className="mt-2 text-center text-sm font-bold">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Item Details Popup */}
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-4/5 rounded-lg bg-ocean-primary-medium p-6 text-center">
            <h2 className="text-xl font-bold">{selectedItem.name}</h2>
            <p className="mt-2">{selectedItem.description}</p>
            <p className="mt-2">Price: {selectedItem.price} coins each</p>

            <div className="mt-4">
              <label htmlFor="quantity" className="mr-2">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="w-16 rounded border p-1 text-black"
              />
            </div>

            <button
              className="mt-4 rounded bg-ocean-flashturq px-4 py-2 font-bold text-black"
              onClick={handleBuyItem}
            >
              Buy
            </button>
            <button
              className="mt-2 block w-full rounded bg-red-500 px-4 py-2 text-white"
              onClick={() => setSelectedItem(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopTab;
