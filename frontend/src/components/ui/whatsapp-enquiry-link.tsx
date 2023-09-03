import { siteSettings } from '@/settings/site-settings'
import Link from 'next/link'
import React, { FC } from 'react'
import { FaWhatsapp } from 'react-icons/fa'


type WaLinkProp = {
    name: string
    category: any
    color: string
    price: any
    btnName: string
}

const WhatsAppEnquiryLink: FC<WaLinkProp> = ({ name, category, color, price, btnName }) => {
    // console.log(name," ",category," ",color," ",price);
    return (
        <Link
            href={
                `https://wa.me/${siteSettings.support_whatsapp}?text=Hello%20Osty,%20I%20want%20to%20enquire%20Whalesale%20Deal%20for%20Category:%20${category},%20Product:%20${name}%20of%20Color:%20${color}%20and%20Price:${price}.`
            }
            target='_blank'
            className='flex justify-between items-center gap-2 text-lg'
        >
            <span className="font-medium subpixel-antialiased">{btnName}</span>
            <FaWhatsapp />
        </Link>
    )
}

export default WhatsAppEnquiryLink