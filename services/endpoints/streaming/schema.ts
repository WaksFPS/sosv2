import { z } from 'zod'

export const startCallVoipSchema = z.object({
    receiverID: z.number(),
    isVideoCall: z.boolean(),
    isProduction: z.boolean(),
    roomName: z.string().optional(),
    token: z.string(),
    meetingID: z.string(),
})

export type StartCallVoipType = z.infer<typeof startCallVoipSchema>

export const updateAllCallVoipSchema = z.object({
    receiverID: z.number(),
    type: z.string(),
    callerUUID: z.string(),
})

export type UpdateAllCallVoipType = z.infer<typeof updateAllCallVoipSchema>

export const updateCallVoipSchema = z.object({
    ...updateAllCallVoipSchema.shape,
    deviceToken: z.string(),
})

export type UpdateCallVoipType = z.infer<typeof updateCallVoipSchema>

export interface StartCallVoipResponse {
    uuid: string
    item_id: string
    roomName: string
    receiverId: string
    receiverName: string
    receiverAvatar: string
    senderId: string
    senderName: string
    senderAvatar: string
}

export type VideoSDKTokenResponse = {
    token: string
}

export type MeetingRoom = {
    roomId: string
    customRoomId: string
    userId: string
    disabled: boolean
    createdAt: string
    updatedAt: string
    id: string
    links: MeetingRoomLinks
}

export type MeetingRoomLinks = {
    get_room: string
    get_session: string
}
