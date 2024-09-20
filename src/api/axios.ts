import axios from 'axios'
// import { LoginInput } from '../pages/login.page'
// import { RegisterInput } from '../pages/register.page'
// import { GenericResponse, ILoginResponse, IUserResponse } from './types'

const BASE_URL = 'http://localhost:8000/api/'

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        common: {
            'Content-Type': 'application/json',
        },
    },
})

// export const refreshAccessToken = async () => {
//     const response = await authApi.get<ILoginResponse>('auth/refresh')
//     return response.data
// }

// authApi.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     async (error) => {
//         const originalRequest = error.config
//         const errMessage = error.response.data.message as string
//         if (errMessage.includes('not logged in') && !originalRequest._retry) {
//             originalRequest._retry = true
//             await refreshAccessToken()
//             return authApi(originalRequest)
//         }
//         if (error.response.data.message.includes('not refresh')) {
//             document.location.href = '/login'
//         }
//         return Promise.reject(error)
//     }
// )

// export const getMe = async () => {
//     const response = await authApi.get<IUserResponse>('mock-api/auth/user')
//     return response.data
// }

export const getStates = async () => {
    return (await axios.get('/mock-api/states')).data
}


