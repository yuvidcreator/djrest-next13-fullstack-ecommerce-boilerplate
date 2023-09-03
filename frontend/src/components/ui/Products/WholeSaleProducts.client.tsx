"use client";


import { getProductsFn } from '@/reactquery/queryFns/productsQueryFns';
import { Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
// import MyProductCard from './MyProductCard';
import WholeSaleProductCard from './WholeSaleProductCard';
// import MyWholeSaleProductCard from '@/components/ui/wholesale-product-card';
import ProductFeedLoader from '@/components/ui/loaders/product-feed-loader';


const GetAllWholeSaleProducts = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getProductsFn,
    });
    // console.log(data);
    const products: Product[] = data?.data;

    if (isLoading) return <div><ProductFeedLoader /></div> 
    if (!data) return <div></div> 

    return (
        <div className='flex justify-center items-center sm:justify-normal'>
            {
                products.map((product, index) => (
                    <div className='group box-border overflow-hidden flex rounded-md transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product shadow-wholeSaleProduct cursor-pointer' key={index}>
                        <WholeSaleProductCard product={product} />
                        {/* <MyWholeSaleProductCard 
                            key={index} 
                            product={product}
                            variant='gridModernWide'
                        /> */}
                    </div>
                ))
            }
        </div>
    )
}

export default GetAllWholeSaleProducts