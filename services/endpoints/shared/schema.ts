import { z } from 'zod'

export const pageCountSchema = z.object({
    count: z.number(),
})

export type PageCountType = z.infer<typeof pageCountSchema>

export const mediaProfileResoSchema = z.object({
    _o: z.string().optional(),
    _100: z.string().optional(),
    _500: z.string().optional(),
    _1024: z.string().optional(),
})

export type MediaProfileResoType = z.infer<typeof mediaProfileResoSchema>

export const statusSchema = z.object({
    code: z.string(),
    description: z.string(),
})

export type StatusType = z.infer<typeof statusSchema>

export const searchParamsSchema = z.object({
    keyword: z.string().nullish(),
    page: z.number().default(1),
})

export type SearchParamsType = z.infer<typeof searchParamsSchema>

export const addressSchema = z.object({
    zipCode: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
})

export type AddressType = z.infer<typeof addressSchema>

export const positionSchema = z.object({
    isLocationOn: z.number(),
    lastPosLat: z.number(),
    lastPosLng: z.number(),
})

export type PositionType = z.infer<typeof positionSchema>

export const addressPositionSchema = z.object({
    lat: z.number(),
    lng: z.number(),
})

export type AddressPositionType = z.infer<typeof addressPositionSchema>

export const hometownSchema = z.object({
    city: z.string(),
    state: z.string(),
    country: z.string(),
})

export type HometownType = z.infer<typeof hometownSchema>

export type VoipNotificationType = {
    callerName: string
    handle: string
    isVideo: boolean
    is_hidden: string
    item_id: string
    notif_type: string
    receiver_id: number
    receiver_name: string
    roomName: string
    sender_id: number
    twi_body: string
    twi_title: string
    type: string
    uuid: string
    token: string
    meeting_id: string
}
