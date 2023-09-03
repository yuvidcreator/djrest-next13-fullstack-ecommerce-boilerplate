import Image from 'next/image'
import React, { FC } from 'react'
import Text from './text'
import Link from 'next/link'
import { IoHomeSharp } from 'react-icons/io5'


type PageProp = {
    description: string
    slug?: string
	searchParams?: string | number | undefined | null
}

const NotFoundComponent: FC<PageProp> = ({ slug, description }) => {
    return (
        <div className="border-t border-b border-gray-300 text-center px-16 py-16 sm:py-20 lg:py-24 xl:py-32 flex items-center justify-center">
			<div>
				<Image
					src="/assets/svg/404.svg"
					alt=""
					width={822}
					height={492}
				/>
				
				<Text variant="mediumHeading">{"Ooops..."}</Text>
				<p className="text-sm md:text-base leading-7 pt-2 md:pt-3.5 pb-7 md:pb-9">
					{
						description ? (description) : (
							"Something went wrong.."
						)
					}
				</p>
				<Link
					href="/"
					className="text-[13px] md:text-sm lg:text-base leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 bg-heading text-gray-100 px-4 md:px-6  py-2.5 lg:py-3 hover:text-white hover:bg-pink-600 hover:shadow-cart rounded-lg"
				>
					<IoHomeSharp />
					<span className="ps-1.5">{"Back to Shop"}</span>
				</Link>
			</div>
		</div>
    )
}

export default NotFoundComponent