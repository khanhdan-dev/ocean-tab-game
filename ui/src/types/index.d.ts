interface UserResources {
  coins: number;
  fish: number;
  shells: number;
}

export interface ITelegramUserInfo {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name: string;
  username: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url: string;
  turns: number;
  score: number;
  isNewUser?: boolean;
  resources: UserResources;
}

export interface ITelegramNewUserInfo extends ITelegramUserInfo {
  isNewUser?: boolean;
}
