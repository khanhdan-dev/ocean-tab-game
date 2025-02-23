import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faGamepad,
  faListCheck,
  faRankingStar,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export const tabList = [
  {
    name: 'Game',
    icon: <FontAwesomeIcon icon={faGamepad} />,
  },
  {
    name: 'Quest',
    icon: <FontAwesomeIcon icon={faListCheck} />,
  },
  {
    name: 'Shop',
    icon: <FontAwesomeIcon icon={faCartShopping} />,
  },
  {
    name: 'Rank',
    icon: <FontAwesomeIcon icon={faRankingStar} />,
  },
  {
    name: 'Profile',
    icon: <FontAwesomeIcon icon={faUser} />,
  },
];
