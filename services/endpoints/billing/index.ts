import { axiosInstance } from '@/services/axios'
import { BillingClaimFreeTrialType } from './schema'

export const billingUnsubscribeWipeApi = async (
    stripeSubscriptionPlanId: number,
) => {
    const response = await axiosInstance.delete(
        `billing/service/unsubscribe/wipe/${stripeSubscriptionPlanId}`,
    )
    return response.data
}

export const billingClaimFreeTrialApi = async (
    params: BillingClaimFreeTrialType,
) => {
    const response = await axiosInstance.post(
        `billing/service/freetrial/claim`,
        params,
        {
            headers: {
                ['user-id']: params.userId,
            },
        },
    )
    return response.data
}

export const billingUnsubscribeApi = async (
    stripeSubscriptionPlanId: string,
) => {
    const response = await axiosInstance.delete(
        `billing/service/unsubscribe/${stripeSubscriptionPlanId}`,
    )
    return response.data
}
