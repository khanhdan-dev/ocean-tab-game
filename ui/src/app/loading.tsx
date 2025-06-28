import Image from 'next/image';
import { getImageSrc } from 'kan/utils/getImageSrc';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-b from-indigo-500 to-purple-600">
      <div className="w-3/4 max-w-md">
        <div className="mb-3 flex w-full flex-col items-center">
          <Image
            className="h-[30vh] w-fit animate-bounce bg-firefly-radial"
            src={getImageSrc(`/logo/logo-diver.png`)}
            alt="logo"
            width={20000}
            height={20000}
          />
        </div>
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-700">
          <div className="h-full w-1/3 animate-pulse bg-gradient-to-r from-cyan-400 to-blue-500" />
        </div>
        <p className="mt-2 text-center text-sm text-white">
          Loading ocean adventure...
        </p>
      </div>
    </div>
  );
}
