import { axiosInstance } from '@/services/axios'
import { GetNotificationType, SendNotificationType } from './schema'

export const sendNotificationApi = async (props: SendNotificationType) => {
    const response = await axiosInstance.post('/fcm/notification/send', props)

    return response.data
}

export const getNotificationApi = async (userId: number) => {
    const response = await axiosInstance.get(`/notification/${userId}`)

    return response.data as GetNotificationType
}
