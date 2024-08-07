import { axiosInstance } from '@/services/axios'
import { GetShortlistResponseType, GetShortlistType, GetWhoIViewedResponseType, GetWhoIViewedType} from './schema'

export const getShortlist = async (data: GetShortlistType) => {
        const response = await axiosInstance.get(
            `/connection/shortlist`,
            {
                params: data,
            },
        )
        return response.data as GetShortlistResponseType
 
};

export const getWhoIViewed = async (data: GetWhoIViewedType) => {
    const response = await axiosInstance.get(
        `connection/whoiview`,
        {
            params: data,
        },
    )
    return response.data as GetWhoIViewedResponseType

};