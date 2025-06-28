'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getImageSrc } from 'kan/utils/getImageSrc';

interface MobileOnlyWrapperProps {
  children: React.ReactNode;
}

export function MobileOnlyWrapper({ children }: MobileOnlyWrapperProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768; // md breakpoint
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show loading state while checking device type
  if (isMobile === null) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-500 to-cyan-600">
        <div className="w-3/4 max-w-md">
          <div className="mb-3 flex w-full flex-col items-center">
            <Image
              className="h-[25vh] w-fit animate-pulse bg-firefly-radial"
              src={getImageSrc(`/logo/logo-diver.png`)}
              alt="logo"
              width={20000}
              height={20000}
            />
          </div>
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-700">
            <div className="h-full w-1/2 animate-pulse bg-gradient-to-r from-blue-400 to-cyan-500" />
          </div>
          <p className="mt-2 text-center text-sm text-white">
            Checking device compatibility...
          </p>
        </div>
      </div>
    );
  }

  // Show mobile content
  if (isMobile) {
    return <>{children}</>;
  }

  // Show desktop notification
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-900">
      <div className="relative mx-4 max-w-md rounded-3xl bg-white/10 p-8 text-center backdrop-blur-xl">
        {/* Background decoration */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-white/5" />
        <div className="absolute -left-4 -top-4 h-8 w-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-60" />
        <div className="absolute -bottom-4 -right-4 h-12 w-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 opacity-40" />

        {/* Main content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Image
                className="h-32 w-auto bg-firefly-radial"
                src={getImageSrc(`/logo/logo-diver.png`)}
                alt="Ocean Tab Game Logo"
                width={20000}
                height={20000}
              />
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl" />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-3xl font-bold text-white">Ocean Hunter</h1>

          {/* Message */}
          <div className="mb-6 space-y-3 text-white/90">
            <p className="text-lg font-medium">🌊 Dive into the adventure!</p>
            <p className="text-sm leading-relaxed">
              This game is designed specifically for mobile devices to provide
              the best gaming experience. Please open this game on your
              smartphone to start your underwater journey.
            </p>
          </div>

          {/* Features */}
          <div className="mb-6 grid grid-cols-2 gap-3 text-xs text-white/80">
            <div className="flex items-center gap-2 rounded-lg bg-white/10 p-2 backdrop-blur-sm">
              <span className="text-lg">🎮</span>
              <span>Touch Controls</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 p-2 backdrop-blur-sm">
              <span className="text-lg">📱</span>
              <span>Mobile Optimized</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 p-2 backdrop-blur-sm">
              <span className="text-lg">🌊</span>
              <span>Underwater Adventure</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 p-2 backdrop-blur-sm">
              <span className="text-lg">🏆</span>
              <span>Leaderboards</span>
            </div>
          </div>

          {/* Decorative bubbles */}
          <div className="absolute -top-2 left-1/4 h-3 w-3 animate-pulse rounded-full bg-cyan-400/60" />
          <div className="absolute -bottom-2 right-1/4 h-4 w-4 animate-pulse rounded-full bg-blue-400/60" />
          <div className="absolute -left-2 top-1/2 h-2 w-2 animate-pulse rounded-full bg-teal-400/60" />
          <div className="absolute -right-2 top-1/2 h-3 w-3 animate-pulse rounded-full bg-cyan-400/60" />
        </div>
      </div>
    </div>
  );
}
