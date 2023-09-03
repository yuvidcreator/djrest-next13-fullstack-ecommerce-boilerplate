"use client";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React, {Key, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import { restAPIEndpoint } from '@/settings/site-settings';



interface Props {
    images: any[]
    activeImg?: string
    variant?: string
}


const WSProductSwiperZoom: React.FC<Props> = ({images, variant}) => {

    const [ active, setActive ] = useState(0);

    const swiperRef = useRef<any>(null);

    useEffect(() => {
        // swiperRef?.current.swiper.autoplay.stop();
    }, [swiperRef]);

    return (
        <div
            className="cursor-pointer"
            // onMouseEnter={() => {
            //     swiperRef.current.swiper.autoplay.sart();
            // }}
            // onMouseLeave={() => {
            //     swiperRef.current.swiper.autoplay.stop();
            //     swiperRef.current.swiper?.slideTo(0);
            // }}
        >
            <Swiper
                zoom={true}
                slidesPerView={1}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                // autoplay={{
                //     delay: 1000,
                //     stopOnLastSlide: false
                // }}
                keyboard={{
                    enabled: true,
                }}
                speed={1000}
                modules={[Zoom, Navigation, Pagination, Keyboard]}
                className="mySwiper"
            >
                {
                    images?.map((img: any, i: string | number | Key | null | undefined) => (
                        <SwiperSlide key={i}>
                            <div 
                                className="swiper-zoom-container"
                                // onMouseOver={() => setActive(i)}
                            >
                                <img 
                                    src={`${restAPIEndpoint}${img.image}`} 
                                    alt='' 
                                    className='object-cover'
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className='flex justify-center items-center text-center text-xs lg:text-base'>
                {"Double click to zoom in"}<br />
                {"Use Keyboard Arrow keys / swap left-right to see more Image."}
            </div>
        </div>
    )
}

export default WSProductSwiperZoom