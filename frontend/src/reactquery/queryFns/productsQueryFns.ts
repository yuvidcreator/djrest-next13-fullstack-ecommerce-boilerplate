import { backendRestAxios } from "../utils/backendRestAxios";



export const getProductsFn = async() => backendRestAxios.get("/products/all-products/").then((res) => res.data);

export const getSingleProduct = async(slug: string, color?: string) => {
    if (color) {
        const body: object = {
            color: color,
            // size?: size,
        }
        return await backendRestAxios.get(`/products/product/${slug}/`, body).then((res) => res.data)
    }
    return await backendRestAxios.get(`/products/product/${slug}/`, ).then((res) => res.data)
};