import { AuthType } from '@/services/endpoints/auth/schema'
import { atomWithMMKV } from './mmkv'

interface AuthenticatedUser {
    token: string
    authenticated: boolean
    user: AuthType
    meetingToken?: string
}

const initialAuth: AuthenticatedUser = {
    token: '',
    authenticated: false,
    user: {} as AuthType,
}

export const authAtom = atomWithMMKV<AuthenticatedUser>('auth', initialAuth)
