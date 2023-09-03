


export interface CollectionDataType {
	id: string | number,
	slug: string,
	image: string,
	title: string,
	description: string
}


export interface User {
	username: string,
	first_name: string;
	last_name: string;
	email: string;
	mobile: string;
	gender: string,
	profile_picture: string,
	date_of_birth: string,
	address_line_1: string,
	address_line_2: string,
	pin_code: string,
    city: string,
    state: string,
    country: string,
    is_blocked: string,
    is_active: boolean,
    is_mobile_verified: boolean,
    is_email_verified: boolean,
    is_first_login: boolean,
}


export interface LoginInputType {
	email_or_mobile: string;
	send_otp_on_mobile: boolean;
	checkout?: boolean;
}

export interface Otptype {
	otp: number;
}



export type Attachment = {
	id: string | number
	image: string
	thumbnail?: string
}


export type Category = {
	id: number | string
	name: string
	slug: string
	details?: string
	image?: Attachment
	icon?: string
	productCount?: number
}


export type SubCategory = {
	id: number | string
	name: string
	slug: string
	productCount?: number
}

export type Tag = {
	id: string | number
	name: string
	slug: string
}

export type ProductColor = {
	id: string | number
	name: string
	slug: string
	code: string
	color_image?: string
}


export type ProductSize = {
	id: string | number
	name: string
	slug: string
	size: number
	price: number
	quantity: number

}


export type ProductStatus = {
	published: "Published" | "Draft"
}


export type Product = {
	[key: string]: unknown
	id: number | string
	name: string
	slug: string
	description?: string
	wholesale_price?: number
	category?: Category
	sub_category?: SubCategory
	sub_products: SubProducts[]
	tag?: Tag[]
	is_new_arrival?: boolean
	is_featured?: boolean
	is_active?: boolean
	avg_rating: number
	no_of_reviews?: number
	no_of_views?: number
	product_status?: ProductStatus
	return_policy: string
	shipping_charges: number
}


export type SubProducts = {
	id: string | number
	sku?: string
	color: ProductColor
	sizes: ProductSize[]
	images: Attachment[]
	wholesale_price: number
	video_link?: string
	discount?: number
	no_of_sold?: number
	is_out_of_stock?: boolean
	meta_title?: string
	meta_keyword?: string,
	meta_description?: string
}