"use client";

import { useState } from "react";
// import { Product } from "@/types";


type ParmProps = {
    slug: string
    color?: string | number | undefined
    size?: string | number | undefined
}



const ProductDetailComp = ({ slug, color }: ParmProps) => {


    const [ activeImg, setActiveImg ] = useState("");

    // console.log(slug);
    // console.log(color);

    return (
        <div>ProductDetailComp</div>
    )
}

export default ProductDetailComp