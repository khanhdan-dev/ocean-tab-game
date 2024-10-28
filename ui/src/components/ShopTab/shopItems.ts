export interface ShopItem {
  id: number;
  name: string;
  type: 'equipment' | 'skin' | 'skill';
  price: number;
  description: string;
}
export const shopItems: ShopItem[] = [
  {
    id: 1,
    name: 'Advanced Diving Suit',
    type: 'equipment',
    description: 'Allows the diver to stay underwater for longer durations.',
    price: 500,
  },
  {
    id: 2,
    name: 'Reinforced Fishing Net',
    type: 'equipment',
    description:
      'Increases the chances of catching larger fish and more shells.',
    price: 350,
  },
  {
    id: 3,
    name: 'Harpoon Gun',
    type: 'equipment',
    description: 'Enables the diver to catch rare fish with precision.',
    price: 600,
  },
  {
    id: 4,
    name: 'Swim Faster',
    type: 'skill',
    description:
      "Boosts the diver's swimming speed, making it easier to escape predators.",
    price: 300,
  },
  {
    id: 5,
    name: 'Deep Dive',
    type: 'skill',
    description:
      'Allows the diver to explore deeper parts of the ocean where more treasures are found.',
    price: 700,
  },
  {
    id: 6,
    name: 'Sonar Vision',
    type: 'skill',
    description: 'Reveals hidden treasures and fish locations.',
    price: 450,
  },
  {
    id: 7,
    name: 'Golden Spear',
    type: 'equipment',
    description:
      'A special spear that increases the catch rate of rare sea creatures.',
    price: 800,
  },
  {
    id: 8,
    name: 'Shark Repellent',
    type: 'equipment',
    description: 'Keeps dangerous predators away for a limited time.',
    price: 400,
  },
  {
    id: 9,
    name: 'Marine Camouflage Suit',
    type: 'skin',
    description:
      'Blends in with underwater surroundings to avoid detection by predators.',
    price: 550,
  },
  {
    id: 10,
    name: 'Octopus Tentacle Whip',
    type: 'equipment',
    description: 'A unique tool used to fend off sea creatures and obstacles.',
    price: 500,
  },
  {
    id: 11,
    name: 'Treasure Detector',
    type: 'skill',
    description: 'Helps locate hidden treasures buried under the sand.',
    price: 600,
  },
  {
    id: 12,
    name: 'Sea Dragon Skin',
    type: 'skin',
    description:
      'Transforms the diver’s appearance into a majestic sea dragon.',
    price: 1000,
  },
  {
    id: 13,
    name: 'Coral Shield',
    type: 'equipment',
    description: 'Protects the diver from harmful sea creatures.',
    price: 650,
  },
  {
    id: 14,
    name: 'Bubble Jetpack',
    type: 'equipment',
    description:
      'Allows quick ascents to the surface by using compressed air bubbles.',
    price: 750,
  },
  {
    id: 15,
    name: 'Electric Eel Skill',
    type: 'skill',
    description:
      'Unleashes a shockwave that temporarily stuns nearby sea creatures.',
    price: 700,
  },
  {
    id: 16,
    name: 'Whale Song Skin',
    type: 'skin',
    description: 'Changes the diver’s appearance to mimic the look of a whale.',
    price: 950,
  },
  {
    id: 17,
    name: 'Glow-in-the-Dark Suit',
    type: 'skin',
    description:
      'Illuminates dark underwater areas, allowing better visibility.',
    price: 800,
  },
  {
    id: 18,
    name: 'Triton’s Trident',
    type: 'equipment',
    description:
      'An ancient weapon that increases the power of all underwater attacks.',
    price: 1200,
  },
  {
    id: 19,
    name: 'Crab Armor',
    type: 'skin',
    description:
      'Turns the diver into a crab-like creature, providing extra protection.',
    price: 700,
  },
  {
    id: 20,
    name: 'Water Bending Skill',
    type: 'skill',
    description:
      'Enables control over water currents, making exploration easier.',
    price: 900,
  },
];
