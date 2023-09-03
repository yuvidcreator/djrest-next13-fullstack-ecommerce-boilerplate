"use client"

import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import ProductCardSwiper from '../MyProductCard/ProductCardSwiper'
import { restAPIEndpoint, siteSettings } from '@/settings/site-settings'
// import Button from '@/components/ui/button'
// import { FaTelegramPlane } from 'react-icons/fa'
import { BiPhoneCall } from 'react-icons/bi'
// import { redirect } from 'next/navigation'
import WhatsAppEnquiryLink from '@/components/ui/whatsapp-enquiry-link'
// import { ProductAttributes } from './product-attributes'
// import isEmpty from "lodash/isEmpty";



interface ProductsProps {
    product: Product
}


const WholeSaleProductCard = ({product}: ProductsProps) => {

    const [ active, setActive ] = useState(0);
    const [ images, setImages ] = useState(product.sub_products[active]?.images);
    const [ prices, setPrices ] = useState(product.sub_products[active]?.sizes.map((size) => {return size.price}));
    const [ sizeNames, setSizeNames ] = useState(product.sub_products[active]?.sizes.map((size) => {return size.name}));
    const [ sizes, setSizes ] = useState(product.sub_products[active]?.sizes);
    const [ wholeSalePrice, setWholeSalePrice ] = useState(product.sub_products.map((p) => {return p.wholesale_price}));
    const [ color, setColor ] = useState(product.sub_products.map((pcolor) => { return pcolor.color}));
    const [ colorName, setColorName ] = useState(product.sub_products[active].color.name);
    const [ colorSlug, setColorSlug ] = useState(product.sub_products[active].color.slug);
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
        setColorName(product.sub_products[active].color.name);
        setColorSlug(product.sub_products[active].color.slug);
        // It gives range of prices.
        // setPrices(
        //     (product.sub_products[active]?.sizes?.map((size) => { return size.price; }))?.sort((a, b) => { return a - b; })
        // );
        // it gives single selected price.
        setPrices(
            (product.sub_products[active]?.sizes?.map((size) => { return size.price; }))?.sort((a) => { return a; })
        );
    }, [active]);

    // console.log(product);
    // console.log(color);
    return (
        <div className="flex flex-col relative justify-around w-[290px] p-2">
            <div className="">
                {/* <Link href={`/wholesale/${product.slug}?color=${colorSlug}`}> */}
                <Link href={`/wholesale/${product.slug}`}>
                    <div className="">
                        {/* Product Images Swiper */}
                        <ProductCardSwiper images={images} />
                    </div>
                </Link>

                {/* {
                    product.sub_products[active].discount ? (
                        <div className="absolute -top-1 z-10 bg-osty rounded-full overflow-hidden shadow-black grid place-items-center text-[12px] text-black p-2">
                            - {product.sub_products[active].discount}%
                        </div>
                    ) : ("")
                } */}

                <div className="w-full mt-[5px]">
                    <h2 className="text-lg font-semibold text-heading">
                        {/* <Link href={`/wholesale/${product.slug}?color=${colorSlug}`}> */}
                        <Link href={`/wholesale/${product.slug}`}>
                            {
                                product.name.length > 75 ? `${product.name.substring(0, 75)}...` : product.name
                            }
                        </Link>
                    </h2>
                    
                    <div className='flex relative mt-2 space-x-2 items-center'>
                        <h3 className='font-medium text-black'>
                            Wholesale Price: {" "}
                        </h3>
                        <h4 className="font-bold text-xl text-black">
                            {/* {
                                prices.length === 1 ? `₹ ${prices[0]}` : `₹ ${prices[0]} - ₹ ${prices[prices.length - 1]}`
                            } */}

                            {/* {
                                wholeSalePrice.length === 1 ? `₹ ${wholeSalePrice[0]}` : `₹ ${wholeSalePrice[0]} - ₹ ${wholeSalePrice[wholeSalePrice.length - 1]}`
                            } */}
                            {/* {
                                `₹ ${wholeSalePrice[active]}`
                            } */}
                            {/* {`₹ ${wholeSalePrice[active]} /`} */}
                            {`₹ ${product.wholesale_price} /`}
                        </h4>
                        <span className="text-sm md:text-base font-medium text-black">{`${sizes.length} sizes`}</span>
                    </div>

                    <div className='flex mt-2'>
                        <h3 className='space-x-2 gap-[2px] text-sm text-black font-medium drop-shadow-md '>
                            Sizes: {" "}
                            {sizeNames.map((name, i) => (
                                <span className='bg-osty p-1 rounded-md' key={i}>{name}</span>
                            ))}
                        </h3>
                    </div>
                </div>

                <div className="flex relative justify-between items-center gap-2.5 mt-4">
                    <div className='flex space-x-2'>
                        <h3>
                            Colors: {" "}
                        </h3>
                        {
                            color && color.map((pcolor, colorIndex) => (
                                (!pcolor.color_image == null) ? (
                                    <div key={colorIndex} className="rounded-full shadow-inherit cursor-pointer outline-offset-2 hover:outline-gray-700">
                                        <Image 
                                            src={`${restAPIEndpoint}${pcolor.color_image}`} 
                                            alt='' 
                                            width={20} 
                                            height={20} 
                                            className={`${colorIndex == active && "outline outline-1 outline-black"} object-cover`}
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
                                        className={`${colorIndex == active && "outline outline-1 outline-black"} w-5 h-5 rounded-full overflow-hidden drop-shadow-xl cursor-pointer border-white`}
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
                <div className="flex justify-between mt-4 mb-2 text-base">
                    <button 
                        type="button" 
                        className="flex items-center rounded-lg bg-black text-osty px-4 py-2 hover:bg-osty hover:text-black transition-all ease-in-out duration-300 space-x-2"
                    >
                        {/* <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-osty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> */}
                        <Link href={`tel:${siteSettings.support_whatsapp}`} target='_blank'>
                            <span className="flex justify-between items-center gap-2 text-lg font-medium subpixel-antialiased">
                                Call Now
                                <BiPhoneCall />
                            </span>
                        </Link>
                    </button>
                    <button 
                        type="button" 
                        className="flex items-center rounded-lg bg-black text-osty px-4 py-2 hover:bg-osty hover:text-black transition-all ease-in-out duration-300 space-x-2"
                    >
                        {/* <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-osty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg> */}
                        {/* @ts-ignore */}
                        <WhatsAppEnquiryLink
                            name={product.name}
                            category={product?.category?.name}
                            color={colorName}
                            // price={wholeSalePrice[active]}
                            price={product.wholesale_price}
                            btnName="Get Quote"
                        />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WholeSaleProductCard