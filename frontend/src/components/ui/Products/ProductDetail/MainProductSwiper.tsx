"use client";


import React, { useState } from 'react'
import ReactImageMagnify from 'react-image-magnify';


interface MainProductImageSwipProp {
    images: any[],
    activeImg?: any
}


const MainProductSwiper = ({ images, activeImg }: MainProductImageSwipProp) => {

    // console.log(images)
    // console.log(activeImg)

    const [ active, setActive ] = useState(0);


    return (
        <div className={""}>

            {/* Main Image */}
            <div className={""}>
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
            <div className={""}>
                {
                    images.map((img, i) => (
                        <div 
                            key={i} 
                            className={`${""} ${ i == active && ""}`} 
                            onMouseOver={() => setActive(i)}
                        >
                            <img src={img.image} alt="" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MainProductSwiper