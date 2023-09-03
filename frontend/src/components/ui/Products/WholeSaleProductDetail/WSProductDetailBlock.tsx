"use client";

import WhatsAppEnquiryLink from '@/components/ui/whatsapp-enquiry-link';
import { restAPIEndpoint, siteSettings } from '@/settings/site-settings';
import { Product } from '@/types';
import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import { BiPhoneCall } from 'react-icons/bi';
// import WSProductSwiper from './WSProductSwiper';
import WSProductSwiperZoom from './WSProductSwiperZoom';
// import Image from 'next/image';


interface productProp {
    product: Product
}


const WSProductDetailBlock = ({product}: productProp) => {

    // console.log(product);

    const [ active, setActive ] = useState(0);
    const [ activeImg, setActiveImg ] = useState("");
    const [ images, setImages ] = useState(product.sub_products[active]?.images);
    const [ prices, setPrices ] = useState(product.sub_products[active]?.sizes.map((size) => {return size.price}));
    const [ sizeNames, setSizeNames ] = useState(product.sub_products[active]?.sizes.map((size) => {return size.name}));
    const [ sizes, setSizes ] = useState(product.sub_products[active]?.sizes);
    const [ wholeSalePrice, setWholeSalePrice ] = useState(product.sub_products.map((p) => {return p.wholesale_price}));
    const [ color, setColor ] = useState(product.sub_products.map((pcolor) => { return pcolor.color}));
    const [ colorName, setColorName ] = useState(product.sub_products[active]?.color?.name);
    // const [ colorSlug, setColorSlug ] = useState(product.sub_products[active].color.slug);

    useEffect(() => {
        setImages(product.sub_products[active].images);
        setSizes(product.sub_products[active].sizes);
        setSizeNames(product.sub_products[active].sizes.map((size) => {return size.name}));
        setColorName(product.sub_products[active].color.name);
        // setColorSlug(product.sub_products[active].color.slug);
        // It gives range of prices.
        // setPrices(
        //     (product.sub_products[active]?.sizes?.map((size) => { return size.price; }))?.sort((a, b) => { return a - b; })
        // );
        // it gives single selected price.
        setPrices(
            (product.sub_products[active]?.sizes?.map((size) => { return size.price; }))?.sort((a) => { return a; })
        );
    }, [active]);
    
    return (
            <div className="py-2 md:py-12">
                <div className="max-w-6xl px-4 mx-auto">
                    <div className="flex flex-wrap mb-24 -mx-4">
                        <div className="w-full px-4 mb-4 md:w-1/2 md:mb-0">
                            {/* Breadcrumbs */}
                            <div className={"p-2"}>
                                Wholesale Product / {product.category?.name} <span>/ {product.sub_category?.name}</span>
                            </div>

                            {/* Product Images */}
                            <div className="sticky top-0 overflow-hidden ">
                                <div className="relative mb-6 lg:mb-10">
                                    <WSProductSwiperZoom images={images} activeImg={activeImg} />
                                </div>
                                <div className="flex-wrap hidden -mx-2 md:flex">
                                    {
                                        images.map((image, i: any) => (
                                            <div 
                                                className="w-1/2 p-2 sm:w-1/4" 
                                                key={i}
                                            >
                                                <div 
                                                    className="block border border-transparent hover:border-blue-400 cursor-pointer"
                                                    onMouseOver={() => setActiveImg(i)}
                                                >
                                                    <img className="object-cover w-full lg:h-32" src={`${restAPIEndpoint}${image.image}`} alt="" />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Product Infos */}
                        <div className="w-full px-4 md:w-1/2">
                            <div className="lg:pl-20">
                                <div className="mb-6 ">
                                    <span className="text-red-500">Wholesale Product</span>
                                    <h2 className="max-w-xl mt-2 mb-4 text-2xl font-bold md:text-3xl text-heading">
                                        {product.name}
                                    </h2>
                                    <p className="max-w-md mb-4 text-body">
                                        Description: {product.description}
                                    </p>
                                    
                                    {/* <a href="#" className="text-blue-500 hover:underline">
                                    See how trade-in works</a> */}
                                    <h3 className="flex items-center text-center max-w-xl mt-2 mb-4 text-2xl font-bold md:text-4xl text-heading">
                                        {/* {`₹ ${wholeSalePrice[active]} /`}<span className="text-xl md:text-2xl ml-2">{`${sizes.length} sizes`}</span> */}
                                        {`₹ ${product.wholesale_price} /`}<span className="text-xl md:text-2xl ml-2">{`${sizes.length} sizes`}</span>
                                    </h3>
                                    <h4 className="text-sm text-orange-900 -mt-2">{"(Inclusive of all taxes)"}</h4>
                                </div>

                                <div className="">
                                    <p className="mb-4 text-lg font-semibold">Choose Color</p>
                                    {/* <div className="grid grid-cols-2 gap-4 pb-4 border-b-2 border-gray-300 lg:grid-cols-3">
                                        {
                                            color && color.map((pcolor, colorIndex) => (
                                                <div key={colorIndex}>
                                                    <button 
                                                        className="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 hover:border-black"
                                                        onMouseOver={() => {
                                                            setImages(product.sub_products[colorIndex].images);
                                                            setActive(colorIndex);
                                                        }}
                                                    >
                                                        <div>
                                                            <div className="w-8 h-8 mx-auto mb-2 rounded-full" style={{ background: `${pcolor.code}` }}></div>
                                                            <p className="text-xs text-center text-gray-700">
                                                                {pcolor.name}
                                                            </p>
                                                        </div>
                                                    </button>
                                                </div>
                                            ))
                                        }
                                    </div> */}

                                    {/* My Custom Color Selection */}
                                    <div className='flex gap-2'>
                                        {
                                            color && color.map((pcolor, colorIndex) => (
                                                <div
                                                    key={colorIndex}
                                                    onMouseOver={() => {
                                                        setImages(product.sub_products[colorIndex].images);
                                                        setActive(colorIndex);
                                                    }}
                                                    className={`${colorIndex == active && "outline outline-1 outline-black"} w-5 h-5 rounded-full overflow-hidden drop-shadow-xl cursor-pointer`}
                                                    style={{ background: `${pcolor.code}` }}
                                                >
                                                    <div className="w-8 h-8 mx-auto mb-2 rounded-full"></div>
                                                    <p className="text-xs text-center text-gray-700">
                                                        {pcolor.name}
                                                    </p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="mb-2 text-lg font-semibold">Set Of Sizes You Get</p>
                                    {/* <a href="#" className="text-blue-500 hover:underline">
                                        How much capacity is right for you?
                                    </a> */}
                                    <div className='flex mt-3'>
                                        <h3 className='space-x-2 gap-[2px] text-sm text-black font-medium drop-shadow-md '>
                                            {/* Sizes: {" "} */}
                                            {sizeNames.map((name, i) => (
                                                <span className='bg-osty p-2 rounded-md' key={i}>{name}</span>
                                            ))}
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pb-4 mt-2 mb-4 border-b-2 border-gray-300 lg:grid-cols-3">
                                        {/* {
                                            sizes.map((size, sizeIndex) => (
                                                <div key={sizeIndex}>
                                                    <button className="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300">
                                                        <div>
                                                            <div className="mb-2 font-semibold">
                                                                {size.size} <span className="text-xs">Inch</span>
                                                            </div>
                                                            <p className="px-2 text-xs font-medium text-center text-gray-700">
                                                                Available Quantity: {size.quantity}
                                                            </p>
                                                        </div>
                                                    </button>
                                                </div>
                                            ))
                                        } */}
                                        
                                        {/* <div>
                                            <button className="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 hover:border-blue-400">
                                                <div>
                                                    <div className="mb-2 font-semibold">
                                                        128 <span className="text-xs">GB</span>
                                                    </div>
                                                    <p className="px-2 text-xs font-medium text-center text-gray-700">
                                                        From $99 0r $41.62/mo. for 24 mo.
                                                    </p>
                                                </div>
                                            </button>
                                        </div>
                                        <div>
                                            <button className="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 hover:border-blue-400">
                                                <div>
                                                    <div className="mb-2 font-semibold">
                                                        256 <span className="text-xs">GB</span>
                                                    </div>
                                                    <p className="px-2 text-xs font-medium text-center text-gray-700">
                                                        From $99 0r $41.62/mo. for 24 mo.
                                                    </p>
                                                </div>
                                            </button>
                                        </div>
                                        <div>
                                            <button className="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 hover:border-blue-400">
                                                <div>
                                                    <div className="mb-2 font-semibold">
                                                        512 <span className="text-xs">GB</span>
                                                    </div>
                                                    <p className="px-2 text-xs font-medium text-center text-gray-700">
                                                        From $99 0r $41.62/mo. for 24 mo.
                                                    </p>
                                                </div>
                                            </button>
                                        </div>
                                        <div>
                                            <button className="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 hover:border-blue-400">
                                                <div>
                                                    <div className="mb-2 font-semibold">
                                                        1 <span className="text-xs">GB</span>
                                                    </div>
                                                    <p className="px-2 text-xs font-medium text-center text-gray-700">
                                                        From $99 0r $41.62/mo. for 24 mo.
                                                    </p>
                                                </div>
                                            </button>
                                        </div> */}
                                    </div>
                                </div>

                                {/* Payment Option */}
                                {/* <div className="mt-6">
                                    <p className="mb-4 text-lg font-semibold">Choose a payment option</p>
                                    <div className="grid grid-cols-2 gap-4 pb-4 mt-2 mb-4 border-b-2 border-gray-300 lg:grid-cols-3">
                                        <div>
                                            <button className="flex items-center justify-center w-full h-full px-2 py-6 border-2 border-gray-300 hover:border-blue-400">
                                                <div>
                                                    <p className="px-2 text-base font-semibold text-center text-gray-700">
                                                        Pay in full
                                                    </p>
                                                </div>
                                            </button>
                                        </div>
                                        <div>
                                            <button className="flex items-center justify-center w-full h-full px-2 py-6 border-2 border-gray-300 hover:border-blue-400">
                                                <div>
                                                    <p className="px-2 text-base font-semibold text-center text-gray-700">
                                                        Pay monthly
                                                    </p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="mt-6 ">
                                    <div className="flex flex-wrap items-center">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 text-gray-700 bi bi-truck" viewBox="0 0 16 16">
                                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                                            </svg>
                                        </span>
                                        <h2 className="text-lg font-bold text-gray-700">Delivery :</h2>
                                    </div>
                                    <div className="px-0">
                                        <p className="mb-2 mt-1 text-sm">Availability: In Stock</p>
                                        <p className="mb-2 text-sm">Pan India Delivery Only.</p>
                                        <p className="mb-2 text-sm">Country of Origin : India</p>
                                        <p className="mt-2 text-sm text-blue-800">
                                            <a href={`tel:${siteSettings.author.mobile}`} target='_blank'>Shipping Charges & Any Query?</a>
                                        </p>
                                    </div>
                                </div>

                                {/* <div className="mt-6 ">
                                    <div className="flex flex-wrap items-center">
                                        <span className="mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-4 text-gray-700 bi bi-bag" viewBox="0 0 16 16">
                                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"></path>
                                            </svg>
                                        </span>
                                        <h2 className="text-lg font-bold text-gray-700">Pickup</h2>
                                    </div>
                                    <div className="px-7">
                                        <a className="mb-2 text-sm text-blue-800" href="#">Check availability</a>
                                    </div>
                                </div> */}

                                {/* <div className="mt-6 ">
                                    <button className="w-full px-4 py-2 font-bold text-osty bg-black lg:w-96 hover:bg-osty hover:text-black">
                                        Continue
                                    </button>
                                </div> */}

                                <div className="flex justify-center items-center text-center mt-4 mb-8 text-base gap-2">
                                        <button 
                                            type="button" 
                                            className="flex justify-center items-center rounded-lg w-full bg-black text-osty px-4 py-2 hover:bg-osty hover:text-black transition-all ease-in-out duration-300 space-x-2"
                                        >
                                            {/* Loader */}
                                            {/* <svg className="-ml-1 mr-3 h-5 w-5 animate-spin text-osty" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg> */}
                                            <Link href={`tel:${siteSettings.support_whatsapp}`} target='_blank'>
                                                <span className="flex justify-center items-center gap-2 text-lg font-medium subpixel-antialiased">
                                                    Call Now
                                                    <BiPhoneCall />
                                                </span>
                                            </Link>
                                        </button>
                                        <button 
                                            type="button" 
                                            className="flex justify-center items-center rounded-lg w-full bg-black text-osty px-4 py-2 hover:bg-osty hover:text-black transition-all ease-in-out duration-300 space-x-2"
                                        >
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

                                {/* <div className="flex items-center mt-6 ">
                                    <div>
                                        <h2 className="mb-2 text-lg font-bold text-gray-700">Still deciding?</h2>
                                        <p className="mb-2 text-sm"> 
                                            Add this item to a list and easily come back
                                            to it later 
                                        </p>
                                    </div>
                                    <span className="ml-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-600 bi bi-bookmark" viewBox="0 0 16 16">
                                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
                                        </svg>
                                    </span>
                                </div> */}
                                <div className="px-6 pb-6 mt-6 border-t border-gray-300">
                                    <div className="flex items-center justify-center mt-6">
                                        <span className="mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 text-blue-700 bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
                                                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                                            </svg>
                                        </span>
                                        <div>
                                            <h2 className="text-sm font-bold text-gray-700 lg:text-lg">
                                            Have question about buying an {product.category?.name}</h2>
                                            <div className="text-xs text-blue-900 lg:text-sm">
                                                <WhatsAppEnquiryLink
                                                    name={product.name}
                                                    category={product?.category?.name}
                                                    color={colorName}
                                                    price={wholeSalePrice[active]}
                                                    btnName={`Chat with ${(siteSettings.name).toUpperCase()} Support`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default WSProductDetailBlock