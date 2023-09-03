"use client"

import { FC, useRef } from 'react'
import { Swiper } from 'swiper/react'
import { Navigation, Scrollbar, Pagination, Autoplay } from 'swiper/modules'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { getDirection } from '@/components/utils/get-direction'
import cn from 'classnames'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/scrollbar'
// import { useRouter } from 'next/router'

type CarouselPropsType = {
  className?: string
  buttonGroupClassName?: string
  prevActivateId?: string
  nextActivateId?: string
  paginationFractionId?: string
  prevButtonClasses?: string
  nextButtonClasses?: string
  buttonSize?: 'default' | 'small'
  paginationVariant?: 'default' | 'circle'
  paginationPosition?: 'center' | 'left' | 'right'
  loop?: boolean
  centeredSlides?: boolean
  breakpoints?: {} | any
  pagination?: {} | any
  navigation?: {} | any
  scrollbar?: {} | any
  autoplay?: {} | any
  type?: 'rounded' | 'circle' | 'list'
  isFraction?: boolean
}

const Carousel: FC<CarouselPropsType> = ({
  // @ts-ignore
  children,
  className = '',
  buttonGroupClassName = '',
  prevActivateId = '',
  nextActivateId = '',
  paginationFractionId = '',
  prevButtonClasses = 'start-0',
  nextButtonClasses = 'end-0',
  buttonSize = 'default',
  paginationVariant = 'default',
  paginationPosition,
  breakpoints,
  loop = true,
  navigation = true,
  pagination = false,
  autoplay = false,
  type = 'circle',
  isFraction = false,
  ...props
}) => {
  // const {  } = useRouter();
  const dir = getDirection(undefined)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const classPagination = paginationPosition
    ? `pagination-${paginationPosition}`
    : ''

  let nextButtonClassName = cn(
    'w-7 h-7 lg:w-8 lg:h-8 text-sm md:text-base lg:text-lg text-black flex items-center justify-center rounded bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none transform shadow-navigation translate-x-1/2',
    {
      'rounded-full': type === 'circle',
      'lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl':
        buttonSize === 'default',
      'shadow-navigationReverse -translate-x-1/2': dir === 'rtl',
      '!static': type === 'list',
    },
    nextButtonClasses
  )

  let prevButtonClassName = cn(
    'w-7 h-7 lg:w-8 lg:h-8 text-sm md:text-base lg:text-lg text-black flex items-center justify-center rounded bg-white absolute transition duration-250 hover:bg-gray-900 hover:text-white focus:outline-none transform shadow-navigation -translate-x-1/2',
    {
      'rounded-full': type === 'circle',
      'lg:w-9 lg:h-9 xl:w-10 xl:h-10 3xl:w-12 3xl:h-12 text-sm md:text-base lg:text-xl 3xl:text-2xl':
        buttonSize === 'default',
      'shadow-navigationReverse translate-x-1/2': dir === 'rtl',
      '!static': type === 'list',
    },
    prevButtonClasses
  )
  return (
    <div
      className={`carouselWrapper relative ${className} ${classPagination} ${
        paginationVariant === 'circle' ? 'dotsCircle' : ''
      } ${type === 'list' ? '!static' : ''}`}
    >
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Scrollbar]}
        loop={loop}
        autoplay={autoplay}
        breakpoints={breakpoints}
        pagination={pagination}
        dir={dir}
        navigation={
          navigation
            ? {
                prevEl: prevActivateId.length
                  ? `#${prevActivateId}`
                  : prevRef.current!, // Assert non-null
                nextEl: nextActivateId.length
                  ? `#${nextActivateId}`
                  : nextRef.current!, // Assert non-null
              }
            : {}
        }
        {...props}
      >
        {children}
      </Swiper>
      {(Boolean(navigation) || Boolean(isFraction)) && (
        <div
          className={cn(
            `flex items-center w-full absolute top-2/4 z-10 ${buttonGroupClassName}`,
            {
              '': type === 'list',
            }
          )}
        >
          {prevActivateId.length > 0 ? (
            <button
              className={prevButtonClassName}
              id={prevActivateId}
              aria-label='prev-button'
            >
              {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </button>
          ) : (
            <button
              ref={prevRef}
              className={prevButtonClassName}
              aria-label='prev-button'
            >
              {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
            </button>
          )}

          {Boolean(isFraction) && (
            <div
              className='text-xs sm:text-base text-center !w-[auto]'
              id={paginationFractionId}
            />
          )}

          {nextActivateId.length > 0 ? (
            <button
              className={nextButtonClassName}
              id={nextActivateId}
              aria-label='next-button'
            >
              {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </button>
          ) : (
            <button
              ref={nextRef}
              className={nextButtonClassName}
              aria-label='next-button'
            >
              {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Carousel
