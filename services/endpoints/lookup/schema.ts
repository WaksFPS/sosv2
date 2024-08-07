import { z } from 'zod'
import { statusSchema } from '../shared/schema'

export type lookUpEnum =
    | 'ALCOHOL'
    | 'BODYTYPE'
    | 'EDUCLEVEL'
    | 'ETHNICITY'
    | 'EXERREGIMEN'
    | 'EYECOLOR'
    | 'GENDER'
    | 'HAIRCOLOR'
    | 'HEART'
    | 'HEIGHT'
    | 'HOBBY'
    | 'HOBBYCATEG'
    | 'INCOMELEVEL'
    | 'ISSUECATEG'
    | 'KIDPOLICY'
    | 'KIDSITUATION'
    | 'LANGUAGE'
    | 'MEMBERSHIPLEVEL'
    | 'PETPOLICY'
    | 'POSPOLITICS'
    | 'SMOKING'
    | 'PROFESSION'
    | 'RATING'
    | 'RELATIONSHIPTYPE'
    | 'RELATIONSHIPSTATUS'
    | 'RELIGBELIEF'

export const membershipSchema = z.object({
    currency: z.string(),
    description: z.string(),
    membershipLevelCode: z.string(),
    rate: z.number(),
    ratePerMonth: z.number(),
    stripeProductId: z.string(),
    subscriptionPlanId: z.number(),
    validityInMonths: z.number(),
})

export type MembershipType = z.infer<typeof membershipSchema>

export const subscriptionPlansSchema = z.object({
    status: statusSchema,
    subscriptionPlan: z.array(membershipSchema),
})

export type SubscriptionPlansType = z.infer<typeof subscriptionPlansSchema>

export const subscriptionDetailsSchema = z.object({
    code: z.string(),
    subscription: z.string(),
    description: z.string(),
    membership: z.array(membershipSchema),
})

export type SubscriptionDetailsType = z.infer<typeof subscriptionDetailsSchema>

export const lookUpSchema = z.object({
    code: z.string(),
    description: z.string(),
})

export type LookUpType = z.infer<typeof lookUpSchema>

export const getLookUpSchema = z.object({
    status: statusSchema,
    lookUp: z.array(lookUpSchema),
})

export type GetLookUpType = z.infer<typeof getLookUpSchema>
