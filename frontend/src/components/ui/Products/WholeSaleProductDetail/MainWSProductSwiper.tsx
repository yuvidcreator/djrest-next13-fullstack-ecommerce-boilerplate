"use client"

import { restAPIEndpoint } from '@/settings/site-settings';
import React, { useState } from 'react'
import ReactImageMagnify from 'react-image-magnify';
// import ProductCardSwiper from '../MyProductCard/ProductCardSwiper';


interface MainProductImageSwipProp {
    images: any[],
    activeImg: any
}


const MainWSProductSwiper = ({ images, activeImg }: MainProductImageSwipProp) => {

    // console.log(images);
    // console.log(activeImg);

    const [ active, setActive ] = useState(0);

    return (
        <div className="flex flex-col">

            {/* Main Image */}
            <div className="z-[99]">
                <ReactImageMagnify
                    {...{
                        smallImage: {
                            alt: '',
                            isFluidWidth: true,
                            src: activeImg || images[active].image
                        },
                        largeImage: {
                            src: activeImg || images[active].image,
                            width: 1200,
                            height: 1400
                        },
                        enlargedImageContainerDimensions: {
                            width: "150%",
                            height: "150%"
                        },
                    }}
                />
            </div>

            {/* List of Images */}
            <div className="flex mt-2 gap-2 relative cursor-pointer bg-white">
                {
                    images.map((img: any, i: number) => (
                        <div 
                            key={i} 
                            className={`items-start bg-gray-300 object-cover rounded-s-md w-full rounded-md transition duration-200 ease-in group-hover:rounded-b-none ${ i == active && "outline outline-1 outline-black outline-offset-[3px]"}`} 
                            onMouseOver={() => setActive(i)}
                        >
                            <img src={`${restAPIEndpoint}${img.image}`} alt="" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MainWSProductSwiper