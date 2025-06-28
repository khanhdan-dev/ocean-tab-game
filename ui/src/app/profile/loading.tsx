import Image from 'next/image';
import { getImageSrc } from 'kan/utils/getImageSrc';

export default function ProfileLoading() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-b from-blue-500 to-cyan-600">
      <div className="w-3/4 max-w-md">
        <div className="mb-3 flex w-full flex-col items-center">
          <Image
            className="h-[25vh] w-fit animate-spin bg-firefly-radial"
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
          Loading profile...
        </p>
      </div>
    </div>
  );
}
