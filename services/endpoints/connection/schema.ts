import { z } from 'zod'
import { statusSchema } from '../shared/schema'
import { userConnectionSchema } from '../calendar/schema'
import { userSchema } from '../user/schema'

export const getShortlistSchema = z.object({
    user_id: z.number(),
   
})

export const getWhoIViewedSchema = z.object({
    user_id: z.number(),
   
})


export type GetShortlistType = z.infer<typeof getShortlistSchema>
export type GetWhoIViewedType = z.infer<typeof getWhoIViewedSchema>



export const getShortlistResponseSchema = z.object({
    status: statusSchema,
    userConnection: z.array(userConnectionSchema),

})

export const getWhoIViewedResponseSchema = z.object({
    status: statusSchema,
    userConnection: z.array(userConnectionSchema),

})

export type GetShortlistResponseType = z.infer<typeof getShortlistResponseSchema>
export type GetWhoIViewedResponseType = z.infer<typeof getWhoIViewedResponseSchema>
