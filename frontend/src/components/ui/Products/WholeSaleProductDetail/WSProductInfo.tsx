"use client"

import { restAPIEndpoint } from '@/settings/site-settings';
import { Product } from '@/types'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface WsProductInfoProp {
    product: Product,
    setActiveImg: any,
}

const WSProductInfo = ({ product, setActiveImg }: WsProductInfoProp) => {

    // console.log(product);
    // console.log(setActiveImg)

    const [ active, setActive ] = useState(0);
    const [ images, setImages ] = useState(product.sub_products[active]?.images);
    const [ prices, setPrices ] = useState(product.sub_products[active]?.sizes.map((size) => {return size.price}));
    const [ sizeNames, setSizeNames ] = useState(product.sub_products[active]?.sizes.map((size) => {return size.name}));
    const [ sizes, setSizes ] = useState(product.sub_products[active]?.sizes);
    const [ wholeSalePrice, setWholeSalePrice ] = useState(product.sub_products.map((p) => {return p.wholesale_price}));
    const [ color, setColor ] = useState(product.sub_products.map((pcolor) => { return pcolor.color}));
    const [ colorName, setColorName ] = useState(product.sub_products[active].color.name);
    const [ colorSlug, setColorSlug ] = useState(product.sub_products[active].color.slug);

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

    return (
        <div>
            <div>
                <h1>{product.name}</h1>
            </div>

            <div>
                <div>Avg Rating: {product.avg_rating}</div>
                <div>({product.no_of_reviews})</div>
            </div>

            <div>
                {`₹ ${wholeSalePrice[active]}`}
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
                                        className="w-5 h-5 rounded-full overflow-hidden drop-shadow-xl cursor-pointer outline outline-1 outline-black"
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

export default WSProductInfo