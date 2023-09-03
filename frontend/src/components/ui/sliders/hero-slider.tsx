"use client"

import BannerCard from '@/components/ui/banners/banner-card'
import Carousel from '@/components/ui/carousel/carousel'
// import { ROUTES } from '@utils/routes'
import { SwiperSlide } from 'swiper/react'
import cn from 'classnames'

interface Props {
  data: any
  className?: string
  buttonGroupClassName?: string
  variant?: 'box' | 'fullWidth'
  variantRounded?: 'rounded' | 'default'
  prevNextButtons?: 'none' | ''
}

const HeroSlider: React.FC<Props> = ({
  className = 'mb-12 md:mb-14 xl:mb-[60px]',
  variant = 'box',
  variantRounded = 'rounded',
  buttonGroupClassName = '',
  data,
  prevNextButtons = '',
}) => {
  return (
    <div
      className={cn(
        'relative mb-5 md:mb-8',
        {
          'mx-auto max-w-[1920px]': variant === 'fullWidth',
        },
        className
      )}
    >
      {/* @ts-ignore */}
      <Carousel
        autoplay={{
          delay: 5000,
        }}
        className={`mx-0 ${
          variant === 'fullWidth' ? 'carousel-full-width' : ''
        }`}
        paginationPosition='left'
        prevButtonClasses={`start-6 md:start-8 xl:start-12 2xl:start-16 ${
          prevNextButtons === 'none' && 'hidden'
        }`}
        nextButtonClasses={`end-6 md:end-8 xl:end-12 2xl:end-16 ${
          prevNextButtons === 'none' && 'hidden'
        }`}
        buttonGroupClassName={buttonGroupClassName}
        nextActivateId='hero-slider-next'
        prevActivateId='hero-slider-prev'
        pagination={{
          clickable: true,
        }}
      >
        {data?.map((banner: any) => (
          <SwiperSlide
            className='carouselItem'
            key={`banner--key-${banner?.id}`}
          >
            <BannerCard
              banner={banner}
              // href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
              href={""}
              variant={variantRounded}
            />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  )
}

export default HeroSlider
