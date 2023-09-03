"use client";

import React, { FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';
import ProductFeedLoader from '@/components/ui/loaders/product-feed-loader';
import { getSingleProduct } from '@/reactquery/queryFns/productsQueryFns';
// import ProductCardSwiper from '../MyProductCard/ProductCardSwiper';
import MainWSProductSwiper from './MainWSProductSwiper';
import WSProductInfo from './WSProductInfo';


interface ProductQueryType {
    slug: string,
    color?: string | undefined,
    size?: string | undefined,
}



const GetSingleWSProduct = (product: ProductQueryType) => {

    // console.log(product)
    
    const { data, isLoading } = useQuery(['product', product.slug], () => getSingleProduct(product.slug, product?.color));
    
    const [ activeImg, setActiveImg ] = useState("");
    
    let fetchedProduct: Product = data?.data
    // console.log(fetchedProduct);

    if (isLoading) return <div><ProductFeedLoader /></div> 
    if (!data) return <div>No Product Found</div> 

    return (
        <div className='min-h-screen'>
        {
            fetchedProduct ? (
                <div className='w-[1300px] m-0 p-4'>
                    {/* Breadcrumb */}
                    <div className='text-sm text-heading'>
                        Home / {fetchedProduct.category?.name}/ {" "}
                        {
                            fetchedProduct.sub_category?.name && fetchedProduct.sub_category.name
                        }
                    </div>

                    <div className="relative grid mt-4 gap-4 grid-cols-1">
                        {
                            fetchedProduct.sub_products?.map((subp, subIndex) => (
                                <div key={subIndex}>
                                    <MainWSProductSwiper images={subp.images} activeImg={activeImg} />
                                </div>
                            ))
                        }

                        <WSProductInfo product={fetchedProduct} setActiveImg={setActiveImg} />
                    </div>

                </div>
            ) : (
                <></>
            )
        }
        </div>
    )
}

export default GetSingleWSProduct