import { axiosInstance } from '@/services/axios'
import { GetLookUpType, lookUpEnum, SubscriptionPlansType } from './schema'

export const getLookUpSubscriptionPlan = async () => {
    const response = await axiosInstance.get(`lookup/subscription/`)

    return response.data as SubscriptionPlansType
}

export const getLookUpByName = async (lookup: lookUpEnum) => {
    const response = await axiosInstance.get(`lookup/profile/${lookup}`)

    return response.data as GetLookUpType
}
