"use client"

import { Key, useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { restAPIEndpoint } from '@/settings/site-settings';
import Image from 'next/image';


interface Props {
    images: any[]
}




const ProductImagesSlider: React.FC<Props> = ({images}) => {
    // console.log(images);

    const swiperRef = useRef<any>(null);

    useEffect(() => {
        swiperRef?.current.swiper.autoplay.stop();
    }, [swiperRef]);

    return (
        <div 
            className="relative cursor-pointer bg-white"
            onMouseEnter={() => {
                swiperRef.current.swiper.autoplay.start();
            }}
            onMouseLeave={() => {
                swiperRef.current.swiper.autoplay.stop();
                swiperRef.current.swiper?.slideTo(0);
            }}
        >
            <Swiper 
                ref={swiperRef}
                centeredSlides={true}
                autoplay={{
                    delay: 500,
                    stopOnLastSlide: false
                }}
                speed={500}
                modules={[Autoplay, Navigation]}
                navigation = {true}
                className=''
            >
                {
                    images?.map((img: any, i: string | number | Key | null | undefined) => (
                        <SwiperSlide key={i}>
                            <Image 
                                src={`${restAPIEndpoint}${img.image}`} 
                                alt='' 
                                width={400}
                                height={450}
                                style={{objectFit:"cover"}}
                                
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default ProductImagesSlider