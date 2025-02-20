import {
  Seaweed_Script,
  Uncial_Antiqua,
  Mystery_Quest,
  MedievalSharp,
} from 'next/font/google';
import { Habitat } from 'kan/types';
import { getImageSrc } from 'kan/utils/getImageSrc';

const seaweedScript = Seaweed_Script({ subsets: ['latin'], weight: '400' });
const medievalSharp = MedievalSharp({
  subsets: ['latin'],
  weight: '400',
});
const mysteryQuest = Mystery_Quest({
  subsets: ['latin'],
  weight: '400',
});
const uncialAntiqua = Uncial_Antiqua({ subsets: ['latin'], weight: '400' });

export const habitatData: Habitat[] = [
  {
    type: 'shallow reef',
    gameBgClass: 'bg-shallow',
    desktopImage: getImageSrc('/habitats/shallow/shallow-desktop.jpeg'),
    mobileImage: getImageSrc('/habitats/shallow/shallow-mobile.jpeg'),
    description:
      'A vibrant, colorful habitat teeming with marine life near the surface.',
    fontClass: seaweedScript.className,
    bgColor: 'bg-gradient-to-b from-cyan-100 to-cyan-300',
  },
  {
    type: 'reef',
    gameBgClass: 'bg-reef',
    mobileImage: getImageSrc('/habitats/reef/reef-mobile.jpeg'),
    desktopImage: getImageSrc('/habitats/reef/reef-desktop.jpeg'),
    description: 'An expansive underwater coral ecosystem.',
    fontClass: medievalSharp.className,
    bgColor: 'bg-gradient-to-b from-blue-200 to-blue-400',
  },
  {
    type: 'open ocean',
    gameBgClass: 'bg-open',
    mobileImage: getImageSrc('/habitats/open/open-mobile.jpeg'),
    desktopImage: getImageSrc('/habitats/open/open-desktop.jpeg'),
    description:
      'A vast, open underwater expanse with a sense of freedom and mystery.',
    fontClass: mysteryQuest.className,
    bgColor: 'bg-gradient-to-b from-sky-200 to-sky-400',
  },
  {
    type: 'deep ocean',
    gameBgClass: 'bg-deep',
    mobileImage: getImageSrc('/habitats/deep/deep-mobile.jpeg'),
    desktopImage: getImageSrc('/habitats/deep/deep-desktop.jpeg'),
    description: 'A serene, mysterious habitat with glowing marine life.',
    fontClass: uncialAntiqua.className,
    bgColor: 'bg-gradient-to-b from-gray-900 to-blue-900',
  },
];
