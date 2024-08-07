import { z } from 'zod'
import { statusSchema } from '../shared/schema'

export const getHistorySchema = z.object({
    page: z.string().or(z.number()),
    connection_user_id: z.string().or(z.number()),
})

export type GetHistoryType = z.infer<typeof getHistorySchema>

export const historySchema = z.object({
    id: z.number(),
    source: z.number(),
    receiver: z.number(),
    detail: z.string(),
    time: z.number(),
    historyType: z.string(),
})

export type HistoryType = z.infer<typeof historySchema>

export const GetHistoryResponseSchema = z.object({
    status: statusSchema,
    history: z.array(historySchema),
    hasNextPage: z.boolean(),
})

export type GetHistoryResponseType = z.infer<typeof GetHistoryResponseSchema>
