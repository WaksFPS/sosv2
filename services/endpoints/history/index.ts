import { axiosInstance } from '@/services/axios'
import { GetHistoryResponseSchema, GetHistoryType } from './schema'

// not sure where to use
export const getHistoryApi = async (data: GetHistoryType) => {
    const response = await axiosInstance.get(
        `/history/${data.connection_user_id}`,
        {
            params: data,
        },
    )

    return GetHistoryResponseSchema.parse(response.data)
}
