"use client";

import React from 'react'
import { Product } from '@/types'



interface MainProductInfosProp {
    product: Product,
    setActiveImg?: Function
}


const MainProductInfos = ({product, setActiveImg}: MainProductInfosProp) => {

    // console.log(product);
    // console.log(setActiveImg)

    return (
        <div>MainProductInfos</div>
    )
}

export default MainProductInfos