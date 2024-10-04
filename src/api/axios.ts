import axios, { AxiosError, AxiosResponse } from 'axios'
import { useQuery, useMutation } from '@tanstack/react-query'

// https://tanstack.com/query/latest/docs/framework/react/guides/mutations

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
// https://github.com/codegenixdev/react-hook-form-mui-zod-boilerplate/blob/main/src/users/services/mutations.ts

// Dynamic Forms
// https://github.com/codegenixdev/dynamic-form/blob/main/src/App.tsx
// https://www.youtube.com/watch?v=HSr7pMSjC1I
// https://www.youtube.com/watch?v=3e-higRXoaM

//github.com/codegenixdev/react-hook-form-mui-zod-boilerplate/blob/main/src/users/components/Users.tsx
//github.com/codegenixdev/dynamic-form/blob/main/src/App.tsx
// https://github.com/ObaidKhan625/2FA/blob/main/frontend/src/pages/TwoFARegister/TwoFARegister.js

//github.com/ObaidKhan625/2FA/blob/main/frontend/src/pages/TwoFARegister/TwoFARegister.js

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

type State = {
    label: string, 
    value: string
}

type States = {
    data: State[]
}

export const getStates = () => {
    return api.get<AxiosResponse<States>>('/mock-api/states').then(response => response.data)
}

export const useStatesQuery = () => {
    return useQuery<States>({
        queryKey: ['states'],
        queryFn: () => {
            return api.get('/mock-api/states')
        },
        onSuccess: (data: States) => {
            console.log(data.data)
        }
    })
}

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: (data: any) => {
            return api.post('/mock-api/auth/sign-in', data)
        },
        onSuccess: (data) => {
            console.log(`onSuccess default Callback: ${JSON.stringify(data)}`)
        },
        onError: (error) => {
            console.log(`onError default Callback: ${JSON.stringify(error)}`)
        },
    })
}

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: (data: any) => {
            return api.post('/mock-api/auth/sign-up', data)
        },
        onSuccess(data, variables, context) {
            console.log(
                `onSuccess default Callback: ${JSON.stringify(data)} Varibales: ${JSON.stringify(variables)} Context: ${JSON.stringify(context)}`
            )
        },
        onError(error, variables, context) {
            console.log(
                `onError default Callback: ${JSON.stringify(error)} Varibales: ${JSON.stringify(variables)} Context: ${JSON.stringify(context)}`
            )
        },
        // mutationKey: ['register'],
    })
}

export const useVerifyEmailMutation = () => {
    return useMutation({
        mutationFn: (data: any) => {
            return api.post('/mock-api/auth/verify-email', data)
        },
    })
}


export const useForgotPasswordMutation = () => {
    return useMutation({
        mutationFn: (data: any) => {
            return api.post('/mock-api/auth/forgot-password', data)
        },
        // onSuccess(data, variables, context) {
        //     console.log(
        //         `onSuccess default Callback: ${JSON.stringify(data)} Varibales: ${JSON.stringify(variables)} Context: ${JSON.stringify(context)}`
        //     )
        // },
        // onError(error, variables, context) {
        //     console.log(
        //         `onError default Callback: ${JSON.stringify(error)} Varibales: ${JSON.stringify(variables)} Context: ${JSON.stringify(context)}`
        //     )
        // },
        // mutationKey: ['forgot-password'],
    })
}
