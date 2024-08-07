import axios, { AxiosError } from 'axios'

const API_URL =
    process.env.EXPO_PUBLIC_API_URL || 'https://tapi.sosearch.com/v1'

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': 'nocheck',
    },
})

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.data?.status && response.data.status.code !== '200') {
            console.log(
                'API ERROR:',
                response.data?.request._method,
                response.data?.request.responseURL,
                response.data?.response?.status,
                response.data?.response?.data,
            )
            return Promise.reject(response)
        } else if (response.data?.code && response.data.code !== '200') {
            console.log(
                'API ERROR:',
                response.data?.request._method,
                response.data?.request.responseURL,
                response.data?.response?.status,
                response.data?.response?.data,
            )
            return Promise.reject(response)
        }

        return response
    },
    (error: AxiosError) => {
        console.log(
            'API ERROR:',
            error.request._method,
            error.request.responseURL,
            error.response?.status,
            error.response?.data,
        )
        return Promise.reject(error)
    },
)
