import Image from 'next/image';
import { getImageSrc } from 'kan/utils/getImageSrc';

export default function ShopLoading() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-b from-yellow-500 to-orange-600">
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
          <div className="h-full w-2/3 animate-pulse bg-gradient-to-r from-yellow-400 to-orange-500" />
        </div>
        <p className="mt-2 text-center text-sm text-white">Loading shop...</p>
      </div>
    </div>
  );
}
