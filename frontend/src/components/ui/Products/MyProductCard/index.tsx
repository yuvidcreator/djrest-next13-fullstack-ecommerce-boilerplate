"use client"

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import ProductCardSwiper from './ProductCardSwiper'
import { restAPIEndpoint } from '@/settings/site-settings'
// import { ProductAttributes } from './product-attributes'
// import isEmpty from "lodash/isEmpty";



interface ProductsProps {
    product: Product
}


const MyProductCard = ({product}: ProductsProps) => {

    const [ active, setActive ] = useState(0);
    const [ images, setImages ] = useState(product.sub_products[active]?.images);
    const [ prices, setPrices ] = useState(product.sub_products[active]?.sizes.map((size) => {return size.price}));
    const [ sizeNames, setSizeNames ] = useState(product.sub_products[active]?.sizes.map((size) => {return size.name}));
    const [ sizes, setSizes ] = useState(product.sub_products[active]?.sizes);
    const [ wholeSalePrice, setWholeSalePrice ] = useState(product.sub_products.map((p) => p.wholesale_price));
    const [ color, setColor ] = useState(product.sub_products.map((pcolor) => { return pcolor.color}));
    // const [attributes, setAttributes] = useState<{ [key: string]: string }>({});

    // function handleAttribute(attribute: any) {
	// 	setAttributes((prev) => ({
	// 		...prev,
	// 		...attribute,
	// 	}));
	// }

    // const handleOnMouseOver = (i: any) => {
	// 	() => {
	// 		setImages(product.sub_products[i].images);
	// 		setActive(i);
	// 	}
	// };

    useEffect(() => {
        setImages(product.sub_products[active].images);
        setSizes(product.sub_products[active].sizes);
        setSizeNames(product.sub_products[active].sizes.map((size) => {return size.name}));
        setPrices(
            (product.sub_products[active]?.sizes?.map((size) => { return size.price; }))?.sort((a, b) => { return a - b; })
        );
    }, [active]);

    // console.log(product);
    // console.log(color);
    return (
        <div className="relative w-[290px] h-[500px] shadow-black">
            <div className="">
                <Link href={`/product/${product.slug}?color=${active}`}>
                    <div className="">
                        {/* Product Images Swiper */}
                        <ProductCardSwiper images={images} />
                    </div>
                </Link>

                {
                    product.sub_products[active].discount ? (
                        <div className="absolute -top-1 z-10 bg-osty rounded-full overflow-hidden shadow-black grid place-items-center text-[12px] text-black p-2">
                            - {product.sub_products[active].discount}%
                        </div>
                    ) : ("")
                }

                <div className="w-full mt-[5px]">
                    <h2 className="text-lg font-semibold text-heading">
                        <Link href={`/product/${product.slug}?color=${active}`}>
                            {
                                product.name.length > 75 ? `${product.name.substring(0, 75)}...` : product.name
                            }
                        </Link>
                    </h2>
                    <div className='flex mt-2'>
                        <h3 className='space-x-2 gap-[2px] text-sm text-black font-mediu'>
                            {sizeNames.map((name, i) => (
                                <span className='bg-osty p-1 rounded-md' key={i}>{name}</span>
                            ))}
                        </h3>
                    </div>
                    <div className='flex mt-2'>
                        <h3 className='text-blue-800'>
                            Wholesale Price -{" "}
                        </h3>
                        <span className="text-heading font-bold text-xl">
                            {/* {
                                prices.length === 1 ? `₹ ${prices[0]}` : `₹ ${prices[0]} - ₹ ${prices[prices.length - 1]}`
                            } */}

                            {
                                wholeSalePrice.length === 1 ? `₹ ${wholeSalePrice[0]}` : `₹ ${wholeSalePrice[0]} - ₹ ${wholeSalePrice[wholeSalePrice.length - 1]}`
                            }
                        </span>
                    </div>
                </div>

                <div className="flex relative items-center gap-2.5 mt-1.5">
                    {
                        color && color.map((pcolor, colorIndex) => (
                            (!pcolor.color_image == null) ? (
                                <div key={colorIndex} className="rounded-full shadow-inherit cursor-pointer outline-offset-2 hover:outline-gray-700">
                                    <Image 
                                        src={`${restAPIEndpoint}${pcolor.color_image}`} 
                                        alt='' 
                                        width={20} 
                                        height={20} 
                                        className={`${colorIndex == active && "outline-black"} object-cover`}
                                        onMouseOver={() => {
                                            setImages(product.sub_products[colorIndex].images);
                                            setActive(colorIndex);
                                        }}
                                    />
                                </div>
                            ) : (
                                <span
                                    style={{ background: `${pcolor.code}` }}
                                    onMouseOver={() => {
                                        setImages(product.sub_products[colorIndex].images);
                                        setActive(colorIndex);
                                    }}
                                    key={colorIndex}
                                    className="w-5 h-5 rounded-full overflow-hidden shadow-black cursor-pointer border-black"
                                >
                                </span>
                                // <ProductAttributes 
                                //     key={`y${pcolor.id}`}
                                //     title={pcolor.name}
                                //     attributes={pcolor}
                                //     active={pcolor.code}
                                //     onClick={handleAttribute}
                                //     onMouseOver={handleOnMouseOver(colorIndex)}
                                // />
                            )
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MyProductCard