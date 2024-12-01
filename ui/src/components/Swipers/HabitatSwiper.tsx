'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';
import { habitatData } from './habitatData';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/keyboard';
import { Habitat, IFishItem } from 'kan/types';
import HabitatTitle from './HabitatTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
  handleCloseGameMatches: (habitatType: IFishItem['habitat'] | null) => void;
  currentHabitat: IFishItem['habitat'] | null;
}

function HabitatSwiper({ handleCloseGameMatches, currentHabitat }: Props) {
  const [activeTitle, setActiveTitle] = useState<string | null>(null); // Track active title
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTitleClick = (title: string) => {
    setActiveTitle(activeTitle === title ? null : title); // Toggle the active title
  };

  const onRenderHabitatCard = () => {
    return habitatData?.map((habitat: Habitat, index) => {
      return habitat.type ? (
        <SwiperSlide title={habitat.description} key={habitat.type}>
          <div
            className={`relative ${
              index === activeIndex
                ? 'hue-rotate-15 filter'
                : 'brightness-75 filter'
            } transition-all duration-300`} // Special effect for center slide
          >
            <Image
              className="hidden h-full w-full rounded-2xl object-cover transition-all duration-300 hover:brightness-110 md:block"
              src={habitat.desktopImage}
              alt={habitat.description}
              width={90000000}
              height={90000000}
              loading="eager"
            />
            <Image
              className="block h-full w-full rounded-2xl object-cover transition-all duration-300 hover:brightness-110 md:hidden"
              src={habitat.mobileImage}
              alt={habitat.description}
              width={90000000}
              height={90000000}
              loading="eager"
            />
            <div className="absolute inset-0 rounded-2xl bg-ocean-white/20">
              <HabitatTitle
                title={habitat.type}
                subtitle={habitat.description}
                fontClass={habitat.fontClass}
                isActive={activeTitle === habitat.type && index === activeIndex} // Check if this card is active
                onClick={() => handleTitleClick(habitat.type)} // Handle click event
                handleCloseGameMatches={handleCloseGameMatches}
              />
            </div>
          </div>
        </SwiperSlide>
      ) : (
        <></>
      );
    });
  };

  return (
    <>
      <div className="relative w-full px-3 md:px-10">
        <Swiper
          initialSlide={
            habitatData.findIndex((h) => h.type === currentHabitat) ?? 0
          }
          modules={[Keyboard]}
          spaceBetween={20}
          breakpoints={{
            375: {
              slidesPerView: 1.5,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2.5,
            },
          }}
          keyboard
          freeMode
          loop
          style={{ zIndex: '0' }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex); // Set active index when slide changes
          }}
          centeredSlides={true}
        >
          {onRenderHabitatCard()}
        </Swiper>
      </div>
      <button
        className="absolute right-2 top-2 text-ocean-white"
        onClick={() =>
          handleCloseGameMatches(
            typeof window !== 'undefined'
              ? ((localStorage.getItem('habitat') ??
                  '') as IFishItem['habitat'])
              : null,
          )
        }
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </>
  );
}

export default HabitatSwiper;
