import {$authHost, $host} from "./index";


export const registration = async (email, password, re_password) => {
    const username = "";
    const response = await $host.post('api/auth/users/', {email, username, password, re_password})
    return response
}

export const login = async (username, password) => {
    const response = await $host.post('api/token/', {username, password})
    localStorage.setItem('access', response.data.access)
    localStorage.setItem('refresh', response.data.refresh)
    return response
}

export const check = async () => {
    let token = localStorage.getItem('access')
    const response = await $authHost.post('api/token/verify/', {token})
    return response
}