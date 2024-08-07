import { z } from 'zod'
import { userDetailSchema } from '../user/schema'
import { statusSchema } from '../shared/schema'
import { NOTIFICATION_TYPE } from '@/dictionary/contants'

export const SendNotificationSchema = z.object({
    item_id: z.number(),
    sender_id: z.number(),
    receiver_id: z.number(),
    receiver_name: z.string(),
    notif_type: z.enum(NOTIFICATION_TYPE),
    title: z.string(),
    body: z.string(),
    is_hidden: z.boolean(),
})

export type SendNotificationType = z.infer<typeof SendNotificationSchema>

export const NotificationSchema = z.object({
    notifId: z.number(),
    userId: z.number(),
    notifType: z.string(),
    details: z.string(),
    itemId: z.number(),
    sourceUserId: z.number(),
    feedId: z.number(),
    isSeen: z.number(),
    status: z.string(),
    whoAdded: z.number(),
    whenAdded: z.number(),
    whoUpdated: z.number(),
    whenUpdated: z.number(),
    isNotificationShowed: z.boolean(),
    isVoipNotification: z.boolean(),
    isHidden: z.boolean(),
    title: z.string(),
    body: z.string(),
    notificationSender: userDetailSchema,
})

export type NotificationType = z.infer<typeof NotificationSchema>

export const GetNotificationSchema = z.object({
    status: statusSchema,
    notification: z.array(NotificationSchema),
})

export type GetNotificationType = z.infer<typeof GetNotificationSchema>
