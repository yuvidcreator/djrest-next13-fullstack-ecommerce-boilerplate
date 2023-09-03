"use client";

import ProductFeedLoader from "@/components/ui/loaders/product-feed-loader";
import { getSingleProduct } from "@/reactquery/queryFns/productsQueryFns";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import WSProductDetailBlock from "./WSProductDetailBlock";


interface ProductQueryType {
    slug: string,
    color?: string | undefined,
    size?: string | undefined,
}



const WholeSaleProductDetail = (product: ProductQueryType) => {
    // console.log(product)
    const { data, isLoading } = useQuery(['product', product.slug], () => getSingleProduct(product.slug, product?.color));
    let fetchedProduct: Product = data?.data
    // console.log(fetchedProduct);

    if (isLoading) return <div><ProductFeedLoader /></div> 
    if (!fetchedProduct) return <div>No Product Found...</div> 

    return (
        <section>
            <div className={""}>
                <WSProductDetailBlock product={fetchedProduct} />
            </div>
        </section>
    )
}

export default WholeSaleProductDetail