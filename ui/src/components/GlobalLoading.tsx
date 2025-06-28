'use client';

import { useNavigationLoading } from 'kan/hooks/useNavigationLoading';
import Image from 'next/image';
import { getImageSrc } from 'kan/utils/getImageSrc';

export function GlobalLoading() {
  const { isLoading, loadingProgress } = useNavigationLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-indigo-500/90 to-purple-600/90 backdrop-blur-sm">
      <div className="w-3/4 max-w-md">
        <div className="mb-3 flex w-full flex-col items-center">
          <Image
            className="h-[20vh] w-fit animate-pulse bg-firefly-radial"
            src={getImageSrc(`/logo/logo-diver.png`)}
            alt="logo"
            width={20000}
            height={20000}
          />
        </div>
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-700">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <p className="mt-2 text-center text-sm text-white">
          Navigating to new waters...
        </p>
      </div>
    </div>
  );
}
