import { z } from 'zod'
import { userDetailSchema } from '../user/schema'
import { statusSchema } from '../shared/schema'

export const callSchema = z.object({
    callId: z.number(),
    callThreadId: z.number(),
    userId: z.number(),
    status: z.string(),
    whoAdded: z.number(),
    whenAdded: z.number(),
    whoUpdated: z.number(),
    whenUpdated: z.number(),
})

export type CallType = z.infer<typeof callSchema>

export const callThreadSchema = z.object({
    callThreadId: z.number(),
    callType: z.string(),
    status: z.string(),
    callStart: z.number(),
    callEnd: z.number(),
    whoAdded: z.number(),
    whenAdded: z.number(),
    whoUpdated: z.number(),
    whenUpdated: z.number(),
    call: callSchema,
    userConnection: userDetailSchema,
})

export type CallThreadType = z.infer<typeof callThreadSchema>

export const GetCallLogsSchema = z.object({
    status: statusSchema,
    callLogs: z.array(callThreadSchema),
    count: z.number(),
    hasNextPage: z.boolean(),
    page: z.number(),
    offset: z.number(),
})

export type GetCallLogsType = z.infer<typeof GetCallLogsSchema>
