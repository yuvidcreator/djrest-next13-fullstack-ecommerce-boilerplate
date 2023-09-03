"use client";


import { getProductsFn } from '@/reactquery/queryFns/productsQueryFns';
// import { restAPIEndpoint } from '@/settings/site-settings';
import { Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
// import Image from 'next/image';
import MyProductCard from './MyProductCard';


const GetAllProducts = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getProductsFn,
    });
    // console.log(data);
    const products: Product[] = data?.data;
    if (isLoading) return <div>Loading ....</div> 
    if (!data) return <div>No Products found ....</div> 
    return (
        <div className='flex justify-center items-center sm:justify-normal'>
            {
                products.map((product, index) => (
                    <MyProductCard product={product} key={index} />
                ))
            }
        </div>
    )
}

export default GetAllProducts