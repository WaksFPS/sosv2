import { z } from 'zod'

import { mediaProfileResoSchema } from '../shared/schema'

export const tokenSchema = z.object({
    tokenId: z.number(),
    jwt: z.string(),
    userId: z.number().optional(),
    expirationTime: z.number(),
    status: z.string(),
    whoAdded: z.number(),
    whenAdded: z.number(),
    whoUpdated: z.number(),
    whenUpdated: z.number(),
})

export type TokenType = z.infer<typeof tokenSchema>

export const authSchema = z.object({
    userId: z.number(),
    userName: z.string(),
    email: z.string(),
    status: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string(),
    birthday: z.string(),
    age: z.number(),
    phoneNo: z.string(),
    mediaProfile: z.string(),
    mediaProfileReso: mediaProfileResoSchema.optional(),
    mediaCover: z.string().nullish(),
    lastLogin: z.number(),
    lastActivity: z.number(),
    whoAdded: z.number(),
    whenAdded: z.number(),
    whoUpdated: z.number(),
    whenUpdated: z.number(),
    distance: z.number(),
    password: z.string(),
    passwordSalt: z.string(),
})

export type AuthType = z.infer<typeof authSchema>

export const authLoginResponseSchema = z.object({
    user: authSchema,
    token: tokenSchema,
})

export const authSignUpResponseSchema = z.object({
    user: authSchema,
    token: tokenSchema,
})

export type AuthLoginResponseType = z.infer<typeof authLoginResponseSchema>
export type AuthSignUpResponseType = z.infer<typeof authSignUpResponseSchema>

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const signupSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    gender: z.string(),
    birthday: z.string(),
    email: z.string().email(),
    phone_no: z.string(),
    who_added: z.number(),
})

export type LoginType = z.infer<typeof loginSchema>
export type SignupType = z.infer<typeof signupSchema>
