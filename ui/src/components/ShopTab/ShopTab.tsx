import React from 'react';

interface ShopItem {
  id: number;
  name: string;
  type: 'equipment' | 'skin';
  price: number;
  imageUrl: string;
}

const shopItems: ShopItem[] = [
  {
    id: 1,
    name: 'Warrior Sword',
    type: 'equipment',
    price: 300,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Knight Shield',
    type: 'equipment',
    price: 250,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Dragon Armor',
    type: 'equipment',
    price: 500,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Stealth Assassin Skin',
    type: 'skin',
    price: 800,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Mystic Mage Skin',
    type: 'skin',
    price: 700,
    imageUrl: 'https://via.placeholder.com/150',
  },
];

function ShopTab() {
  return (
    <div className="min-h-screen bg-ocean-primary-medium p-4 py-20 text-ocean-white">
      <h1 className="mb-6 text-center text-2xl font-bold">Shop</h1>

      {/* Shop Items */}
      <div className="grid grid-cols-1 gap-4">
        {shopItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center rounded-lg bg-ocean-blue p-4 shadow-lg"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="border-customWhite mr-4 h-20 w-20 rounded-lg border-4"
            />
            <div className="flex-1">
              <p className="text-lg font-bold">{item.name}</p>
              <p className="text-sm capitalize">{item.type}</p>
              <p className="text-sm font-semibold">Price: {item.price} coins</p>
            </div>
            <button className="ml-4 rounded-lg bg-green-500 px-4 py-2 font-bold text-black">
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopTab;
