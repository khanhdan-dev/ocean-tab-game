'use client';

import {
  GamepadIcon,
  ListTodo,
  MenuIcon,
  ShoppingCart,
  Trophy,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const tabList = [
  {
    name: 'Game',
    icon: GamepadIcon,
    href: '/',
    notifications: 2, // Mock notification count
  },
  {
    name: 'Quest',
    icon: ListTodo,
    href: '/quest',
    notifications: 5, // Mock notification count
  },
  {
    name: 'Shop',
    icon: ShoppingCart,
    href: '/shop',
    notifications: 0,
  },
  {
    name: 'Rank',
    icon: Trophy,
    href: '/rank',
    notifications: 0,
  },
  {
    name: 'Profile',
    icon: User,
    href: '/profile',
    notifications: 3, // Mock notification count
  },
];

export function FloatingNavbar() {
  const pathname = usePathname();
  const openMenu = localStorage.getItem('openMenu') === 'true';
  const [isOpen, setIsOpen] = useState(openMenu);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = (open: boolean) => {
    setIsAnimating(true);
    setIsOpen(open);
    setTimeout(() => setIsAnimating(false), 300);
    localStorage.setItem('openMenu', JSON.stringify(open));
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2">
      <div className="relative">
        {/* Toggle Button */}
        <button
          onClick={() => handleToggle(true)}
          className={`absolute left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-all duration-200 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : ''} `}
        >
          <MenuIcon className="h-6 w-6" />
        </button>

        {/* Navigation */}
        <nav
          className={`relative rounded-full px-6 py-3 transition-all duration-300 ${isOpen ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'} ${isAnimating ? 'overflow-hidden' : ''} `}
        >
          <ul className="flex items-center gap-x-4 transition-all duration-300">
            {tabList.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <li key={tab.name} className="group relative">
                  <Link
                    href={tab.href}
                    className={`relative flex h-10 w-10 flex-col items-center justify-center rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'border border-ocean-white/20 text-ocean-white backdrop-blur-lg hover:bg-indigo-50 hover:text-indigo-600'
                    } `}
                  >
                    <tab.icon className="h-5 w-5" />
                    {/* Tooltip */}
                    <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-sm text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {tab.name}
                      {tab.notifications > 0 && ` (${tab.notifications})`}
                    </div>
                    {/* Notification Badge */}
                    {tab.notifications > 0 && (
                      <div className="animate-in fade-in absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white duration-200">
                        {tab.notifications}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                onClick={() => handleToggle(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-ocean-flashturq transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <MenuIcon className="h-5 w-5" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
