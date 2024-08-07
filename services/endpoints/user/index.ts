import { axiosInstance } from '@/services/axios'
import {
    ChangePasswordType,
    CheckEmailType,
    CheckUsernameType,
    DeleteUserMediaType,
    ForgotPasswordType,
    GetTwilioTokenParamsType,
    GetTwilioTokenType,
    GetUserDataType,
    GetUserMediaGalleryType,
    LookUpReturnType,
    ResendCodeType,
    SaveDeviceTokenType,
    SendOTPType,
    UpdateUserType,
    UploadPhotoType,
    UserDetailType,
    UserForgotPasswordType,
    UserUpdateFieldType,
    VerifyCodeType,
    VerifyPhoneType,
    VerifyReferralCodeType,
} from './schema'
import FormData from 'form-data'
import { Platform } from 'react-native'
import uuid from 'react-native-uuid'

export const getUserDataApi = async (id: number) => {
    const response = await axiosInstance.get('/user/detail', {
        params: { user_id: id },
    })

    return response.data as GetUserDataType
}

export const getTwilioTokenApi = async (props: GetTwilioTokenParamsType) => {
    const response = await axiosInstance.get('/user/token/twiliochat', {
        params: { user_id: props.userId, channel_type: props.channelType },
    })

    return response.data as GetTwilioTokenType
}

export const initUserDetailsApi = async (props: GetTwilioTokenParamsType) => {
    const userData = await getUserDataApi(props.userId)
    const twilioToken = await getTwilioTokenApi(props)

    return {
        userDetail: userData.userDetail,
        tokenTwilio: twilioToken.tokenTwilio,
    }
}

export const saveDeviceTokenApi = async (props: SaveDeviceTokenType) => {
    const res = await axiosInstance.post('/streaming/fcm/token', props)
    return res.data
}

export const forgetPasswordApi = async (props: ForgotPasswordType) => {
    const response = await axiosInstance.post(
        'public/verifyresetpasswordemail',
        props,
    )
    return response.data as UserForgotPasswordType
}

export const verifyCodeApi = async (props: VerifyCodeType) => {
    const response = await axiosInstance.post(
        'public/verifypassresetcode',
        props,
    )

    return response.data
}

export const resetPasswordApi = async (props: VerifyCodeType) => {
    const response = await axiosInstance.post('public/resetpassword', props)

    return response.data
}

export const verifyPhoneApi = async (props: VerifyPhoneType) => {
    const response = await axiosInstance.post('public/verification', props)
    return response.data
}

export const updateUserApi = async (props: UpdateUserType) => {
    const response = await axiosInstance.post('user/', props)
    return response.data as UserDetailType
}

export const checkUsernameApi = async (props: CheckUsernameType) => {
    const response = await axiosInstance.post(
        'public/username/availability',
        props,
    )

    return response.data
}

export const verifyReferralCodeApi = async (props: VerifyReferralCodeType) => {
    const response = await axiosInstance.post(
        'user/referralCode/availability',
        props,
    )

    return response.data
}

export const resetPasswordCodeApi = async (props: ResendCodeType) => {
    const response = await axiosInstance.post(
        'public/resetpassword/resendcode',
        props,
    )

    return response.data
}

export const resendCodeApi = async (props: ResendCodeType) => {
    const response = await axiosInstance.post('public/resendcode', props)

    return response.data
}

export const uploadPhotoApi = async (props: UploadPhotoType) => {
    const data = new FormData()

    if (Platform.OS === 'ios') {
        const imagePath = props.imageUri.slice(7)

        props.imageUri = imagePath
    }

    data.append('user_id', props.userId)
    data.append('is_primary', props.isPrimary)
    data.append('image', {
        name: uuid.v4(),
        type: 'image/jpeg',
        uri:
            Platform.OS === 'ios' ? props.imageUri : `file://${props.imageUri}`,
    })

    const response = await axiosInstance.post('user/media/photo', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })

    return response.data
}

export const getMediaGalleryApi = async (id: number) => {
    const response = await axiosInstance.get('user/media/gallery', {
        params: { user_id: id },
    })
    return response.data as GetUserMediaGalleryType
}

export const deleteUserMediaApi = async (props: DeleteUserMediaType) => {
    const response = await axiosInstance.delete('user/media/delete', {
        data: props,
    })
    return response.data
}

export const getSearchLookUpApi = async (prop: string) => {
    const response = await axiosInstance.get(`lookup/search/${prop}`)

    //uncomment to test about yourself
    //will be removed once about yourself is connected to sign up
    // const testingJWT =
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MzY3NA.Sv6lHhyI-dbnZetcpbprOjReVbayXhoMlRvhZDBE0Y0'
    // axiosInstance.defaults.headers.common['Authorization'] =
    //     `Bearer ${testingJWT}`

    return response.data as LookUpReturnType
}

export const changePasswordApi = async (props: ChangePasswordType) => {
    const response = await axiosInstance.post('user/changepassword', props)

    return response.data
}

export const checkEmailApi = async (props: CheckEmailType) => {
    const response = await axiosInstance.post(
        'public/email/availability',
        props,
    )

    return response.data
}
export const sendOTPApi = async (props: SendOTPType) => {
    const response = await axiosInstance.post('public/send/otp', props)
    return response.data
}

export const checkFreeTrialApi = async (id: number) => {
    const response = await axiosInstance.get(`user/${id}/free_trial/check`)
    return response.data
}

export const updateUserFieldApi = async (props: UserUpdateFieldType) => {
    const formData = new FormData()
    for (const key in props) {
        if ((props as any)[key] === undefined) continue
        formData.append(key, (props as any)[key])
    }
    const response = await axiosInstance.post('user', props)
    return response.data
}
