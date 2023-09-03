import React from 'react'
import SectionHeader from '@/components/ui/section-header'
import ProductCard from '@/components/ui/product-card'
import ProductFeedLoader from '@/components/ui/loaders/product-feed-loader'
import { Product } from '@/types'
import Alert from '@/components/ui/alert'
import cn from 'classnames'

interface ProductsProps {
  sectionHeading?: any
  categorySlug?: string
  className?: string
  products?: Product[]
  loading: boolean
  error?: string
  uniqueKey?: string
  variant?:
    | 'grid'
    | 'gridSlim'
    | 'list'
    | 'listSmall'
    | 'gridModern'
    | 'gridModernWide'
  limit?: number
  imgWidth?: number | string
  imgHeight?: number | string
}

const ProductsBlock: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  className = 'mb-9 md:mb-10 xl:mb-12',
  products,
  loading,
  error,
  uniqueKey,
  variant = 'grid',
  limit = 10,
  imgWidth,
  imgHeight,
}) => {
  // console.log(products);
  return (
    <div className={className}>
      {sectionHeading && (
        <SectionHeader
          sectionHeading={sectionHeading}
          categorySlug={categorySlug}
        />
      )}

      {error ? (
        <Alert message={error} />
      ) : (
        <div
          className={cn(
            'grid gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 bg-white',
            {
              'grid-cols-2 sm:grid-cols-3 2xl:grid-cols-5': variant === 'grid',
              'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4':
                variant === 'gridModernWide',
              'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5':
                variant === 'gridModern',
            }
          )}
        >
          {loading && !products?.length ? (
            <ProductFeedLoader limit={limit} uniqueKey={uniqueKey} />
          ) : (
            products?.map((product: Product) => (
              <ProductCard
                key={`product--key${product.id}`}
                product={product}
                imgWidth={imgWidth}
                imgHeight={imgHeight}
                variant={variant}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default ProductsBlock
