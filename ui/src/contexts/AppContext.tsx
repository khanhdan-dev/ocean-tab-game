import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

interface AppContextProps {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps>({
  isPlaying: false,
  setIsPlaying: () => false,
});
