import { z } from 'zod'

export const billingClaimFreeTrialSchema = z.object({
    userId: z.number(),
    email: z.string(),
    productId: z.string(),
})

export type BillingClaimFreeTrialType = z.infer<
    typeof billingClaimFreeTrialSchema
>
