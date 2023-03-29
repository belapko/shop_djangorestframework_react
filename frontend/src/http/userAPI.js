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

export const getVerify = async () => {
    let token = localStorage.getItem('access')
    const response = await $authHost.post('api/token/verify/', {token})
    return response
}

export const getRefresh = async () => {
    let refresh = localStorage.getItem('refresh')
    const response = await $authHost.post('api/token/refresh/', {refresh})
    return response
}

export const getUserId = async () => {
    const response = await $authHost.get('api/auth/users/me/')
    return response
}