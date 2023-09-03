"use client"

import cn from 'classnames'
import Image from 'next/image'
import { useState, type FC } from 'react'
import { useUI } from '@/contexts/ui.context'
import usePrice from '@/hooks/products/use-price'
import { Product } from '@/types'
// import ProductIcon1 from '../../../public/assets/images/products/icons/product-icon1.svg'
// import ProductIcon2 from '../../../public/assets/images/products/icons/product-icon2.svg'
// import ProductIcon3 from '../../../public/assets/images/products/icons/product-icon3.svg'
import ProductViewIcon from '@/components/icons/product-view-icon'
import ProductWishIcon from '@/components/icons/product-wish-icon'
import ProductCompareIcon from '@/components/icons/product-compare-icon'
import { restAPIEndpoint } from '@/settings/site-settings'


interface ProductProps {
  product: Product
  className?: string
  contactClassName?: string
  imageContentClassName?: string
  variant?:
    | 'grid'
    | 'gridSlim'
    | 'list'
    | 'listSmall'
    | 'gridModern'
    | 'gridModernWide'
    | 'gridTrendy'
    | 'rounded'
    | 'circle'
  imgWidth?: number | string
  imgHeight?: number | string
  imgLoading?: 'eager' | 'lazy'
}

const ProductCard: FC<ProductProps> = ({
  product,
  className = '',
  contactClassName = '',
  imageContentClassName = '',
  variant = 'list',
  imgWidth = 340,
  imgHeight = 440,
  imgLoading,
}) => {
  const { openModal, setModalView, setModalData } = useUI()
  const [ images, setImages ] = useState(product.sub_products.map((sp) => {return sp.images}));
  const placeholderImage = `/assets/placeholder/products/product-${variant}.svg`
  const { price, basePrice, discount } = usePrice({
    amount: product.wholesale_price ? product.wholesale_price : 0,
    baseAmount: product.wholesale_price,
    currencyCode: 'INR',
  })
  function handlePopupView() {
    setModalData({ data: product })
    setModalView('PRODUCT_VIEW')
    return openModal()
  }
  return (
    <div
      className={cn(
        'group box-border overflow-hidden flex rounded-md cursor-pointer',
        {
          'pe-0 pb-2 lg:pb-3 flex-col items-start bg-white transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product':
            variant === 'grid' ||
            variant === 'gridModern' ||
            variant === 'gridModernWide' ||
            variant === 'gridTrendy',
          'pe-0 md:pb-1 flex-col items-start bg-white': variant === 'gridSlim',
          'items-center bg-transparent border border-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-listProduct':
            variant === 'listSmall',
          'flex-row items-center transition-transform ease-linear bg-gray-200 pe-2 lg:pe-3 2xl:pe-4':
            variant === 'list',
        },
        className
      )}
      onClick={handlePopupView}
      role='button'
      title={product?.name}
    >
      <div
        className={cn(
          'flex',
          {
            'mb-3 md:mb-3.5': variant === 'grid',
            'mb-3 md:mb-3.5 pb-0': variant === 'gridSlim',
            'flex-shrink-0 w-32 sm:w-44 md:w-36 lg:w-44':
              variant === 'listSmall',
            'mb-3 md:mb-3.5 relative':
              variant === 'gridModern' ||
              variant === 'gridModernWide' ||
              variant === 'gridTrendy',
          },
          imageContentClassName
        )}
      >
        <Image
          // src={`${restAPIEndpoint}${product?.image?.thumbnail}` ?? placeholderImage}
          src={`${restAPIEndpoint}${images[0]}` ?? placeholderImage}
          // @ts-ignore
          width={imgWidth}
          // @ts-ignore
          height={imgHeight}
          loading={imgLoading}
          quality={100}
          alt={product?.name || 'Product Image'}
          className={cn('bg-gray-300 object-cover rounded-s-md', {
            'w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none':
              variant === 'grid' ||
              variant === 'gridModern' ||
              variant === 'gridModernWide' ||
              variant === 'gridTrendy',
            'rounded-md transition duration-150 ease-linear transform group-hover:scale-105':
              variant === 'gridSlim',
            'rounded-s-md transition duration-200 ease-linear transform group-hover:scale-105':
              variant === 'list',
          })}
        />

        <div className='absolute top-3.5 md:top-5 3xl:top-7 start-3.5 md:start-5 3xl:start-7 flex flex-col gap-y-1 items-start'>
          {discount &&
            (variant === 'gridModernWide' ||
              variant === 'gridModern' ||
              variant === 'gridTrendy') && (
              <span className='bg-heading text-white text-10px md:text-xs leading-5 rounded-md inline-block px-1 sm:px-1.5 xl:px-2 py-0.5 sm:py-1'>
                <p>
                  <span className='sm:hidden'>-</span>
                  {discount} <span className='hidden sm:inline'>OFF</span>
                </p>
              </span>
            )}

          {product?.is_new_arrival &&
            (variant === 'gridModernWide' ||
              variant === 'gridModern' ||
              variant === 'gridTrendy') && (
              <span className='bg-[#B26788] text-white text-10px md:text-xs leading-5 rounded-md inline-block px-1.5 sm:px-1.5 xl:px-2 py-0.5 sm:py-1'>
                <p>
                  New <span className='hidden sm:inline'>Arrival</span>
                </p>
              </span>
            )}
        </div>

        {variant === 'gridModernWide' && (
          <div className='absolute end-2 sm:end-3 bottom-6 space-y-2 w-[32px] sm:w-[42px] lg:w-[52px]'>
            <ProductViewIcon className='transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-100 w-full bg-white rounded-md' />
            <ProductWishIcon className='transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-200 w-full bg-white rounded-md' />
            <ProductCompareIcon className='transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-300 w-full bg-white rounded-md' />
          </div>
        )}
      </div>
      <div
        className={cn(
          'w-full overflow-hidden',
          {
            'md:px-2.5 xl:px-4': variant === 'grid',

            'px-2 md:px-2.5 xl:px-4 h-full flex flex-col':
              variant === 'gridModern' ||
              variant === 'gridModernWide' ||
              variant === 'gridTrendy',

            'ps-0': variant === 'gridSlim',
            'px-4 lg:px-5 2xl:px-4': variant === 'listSmall',
          },
          contactClassName
        )}
      >
        {(variant === 'gridModern' ||
          variant === 'gridModernWide' ||
          variant === 'gridTrendy') && (
          <div className='py-2 flex items-center gap-x-2'>
            <svg
              className='w-4 h-4 sm:w-6 sm:h-6 text-[#FBD103]'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
            </svg>
            <span className='text-xs sm:text-sm text-heading font-semibold truncate'>
              4.5
            </span>
            {product.quantity === 0 && (
              <span className='text-xs sm:text-sm leading-5 ps-3 font-semibold text-[#EF4444]'>
                Out of stock
              </span>
            )}
          </div>
        )}
        <h2
          className={cn('text-heading font-semibold truncate mb-1', {
            'text-sm md:text-base': variant === 'grid',

            'text-xs sm:text-sm md:text-base':
              variant === 'gridModern' ||
              variant === 'gridModernWide' ||
              variant === 'gridTrendy',
            'md:mb-1.5 text-sm sm:text-base md:text-sm lg:text-base xl:text-lg':
              variant === 'gridSlim',
            'text-sm sm:text-base md:mb-1.5 pb-0': variant === 'listSmall',
            'text-sm sm:text-base md:text-sm lg:text-base xl:text-lg md:mb-1.5':
              variant === 'list',
          })}
        >
          {product?.name}
        </h2>
        {product?.description && (
          <p className='text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate'>
            {product?.description}
          </p>
        )}
        <div
          className={`text-heading font-semibold text-sm sm:text-base mt-1.5 space-s-2 ${
            variant === 'grid'
              ? 'lg:text-lg lg:mt-2.5'
              : 'sm:text-xl md:text-base lg:text-xl md:mt-2.5 2xl:mt-3'
          }
          ${
            variant === 'gridModern' ||
            variant === 'gridModernWide' ||
            variant === 'gridTrendy'
              ? 'flex flex-col-reverse !space-s-0 !mt-auto'
              : ''
          }`}
        >
          <span className='inline-block'>{price}</span>
          {discount && (
            <del className='sm:text-base font-normal text-gray-800'>
              {basePrice}
            </del>
          )}
        </div>
      </div>

      {(variant === 'gridTrendy' || variant === 'gridModern') && (
        <div className='absolute end-2 bottom-2 flex gap-x-2'>
          <ProductWishIcon className='transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-200 w-[35px] sm:w-[42px] lg:w-[52px] bg-[#F1F3F4] rounded-md' />
          <ProductCompareIcon className='transition ease-in duration-300 sm:opacity-0 group-hover:opacity-100 delay-300 w-[35px] sm:w-[42px] lg:w-[52px] bg-[#F1F3F4] rounded-md' />
        </div>
      )}
    </div>
  )
}

export default ProductCard
