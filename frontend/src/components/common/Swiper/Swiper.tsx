import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { SwiperSlideProps } from 'swiper/react/swiper-react';
import './Swiper.scss';

interface SwiperProps extends SwiperSlideProps{
  list: any[];
  height?: number;
  width?: number;
  children: (data: any) => React.ReactNode;
  withoutPagination?: boolean;
  onSlide?: (activeIndex: number) => void;
  activeIndex?: number;
  className?: string;
}

function MySwiper(props: SwiperProps) {
  const [swiper, setSwiper] = useState(null);
  const slideTo = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };
  if (props.activeIndex !== undefined) {
    slideTo(props.activeIndex + 1);
  }

  if (!props.list.length) return null;

  return (
    <Swiper
      pagination={{
        dynamicBullets: !props.withoutPagination,
      }}
      className="swiper-flex"
      onSwiper={setSwiper}
      loop
      modules={props.withoutPagination ? [] : [Pagination]}
      style={{
        height: props.height,
        width: props.width || '100%',
      }}
      onSlideChange={(swiper) => {
        if (props.onSlide && swiper.activeIndex) {
          if (swiper.activeIndex === (props.list.length + 1)) {
            props.onSlide(1);
          } else {
            props.onSlide(swiper.activeIndex);
          }
        }
      }}
      {...props}

    >
      {props.list.map((data, index) => {
        const res = props.children(data);
        if (!res) return null;
        return <SwiperSlide key={index}>{res}</SwiperSlide>;
      })}
    </Swiper>

  );
}

export default MySwiper;
