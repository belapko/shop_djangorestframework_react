import {$authHost, $host} from "./index";

export const fetchCategories = async () => {
    const {data} = await $host.get('api/categories',)
    return data
}

export const fetchProducts = async (category, page) => {
    const {data} = await $host.get('api/products', {
        params: {
            category, page
        }
    })
    return data
}


export const fetchOneProduct = async (slug) => {
    const {data} = await $host.get('api/products/' + slug + '/')
    return data
}