import {$host} from "./index";

export const fetchCart = async () => {
    let userId = localStorage.getItem('uid')
    const response = await $host.get('api/cart/' + userId + '/')
    return response
}

export const addToCart = async (cart, product, quantity = 1) => {
    const {data} = await $host.post('api/cartitem/', {cart, product, quantity})
    return data
}