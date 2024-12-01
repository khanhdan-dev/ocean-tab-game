interface UserResources {
  coins: number;
  fish: number;
  shells: number;
}

export interface ITelegramUserInfo {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
  turns: number;
  isNewUser?: boolean;
  score?: number;
  resources: UserResources;
}

export interface Rewards {
  coins: number;
  fish: number;
  shells: number;
}

export interface IFishItem {
  id: string;
  name: string;
  image: string;
  hp: number;
  speed: number;
  size: 'small' | 'medium' | 'large';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requiredAttacks: number;
  rewards: Rewards;
  habitat: 'shallow reef' | 'reef' | 'open ocean' | 'deep ocean';
}

// TypeScript type
type Habitat = {
  type: IFishItem['habitat'];
  mobileImage: string;
  desktopImage: string;
  description: string; // Optional property for additional information
  fontClass: string;
  bgColor: string;
  gameBgClass: string;
  // [key: string]: string; // To allow additional custom properties
};
