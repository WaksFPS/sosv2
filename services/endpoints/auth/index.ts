import {
    AuthLoginResponseType,
    AuthSignUpResponseType,
    LoginType,
    SignupType,
} from './schema'
import { axiosInstance } from '../../axios'

export const authLoginApi = async (data: LoginType) => {
    const response = await axiosInstance.post('/public/signin', data)

    const resData = response.data as AuthLoginResponseType
    axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${resData.token.jwt}`

    return resData
}

export const authSignUpApi = async (data: SignupType) => {
    const response = await axiosInstance.post('/public/add', data)
    axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token.jwt}`

    return response.data as AuthSignUpResponseType
}
