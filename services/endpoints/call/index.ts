import { axiosInstance } from '@/services/axios'
import { GetCallLogsType } from './schema'

export const getCallLogsApi = async ({
    userId,
}: {
    userId: string | number
}) => {
    const response = await axiosInstance.get(`/call/${userId}`)

    return response.data as GetCallLogsType
}
