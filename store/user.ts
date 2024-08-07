import {
    RegisterUserType,
    UserDetailType,
    UserType,
} from '@/services/endpoints/user/schema'
import { atomWithMMKV } from './mmkv'
import { atom } from 'jotai'

const initUserData = {} as UserDetailType

export const userDataAtom = atomWithMMKV('userData', initUserData)
export const userTokenTwilioAtom = atomWithMMKV('userTokenTwilio', '')

export const userAtom = atom<UserType | null>(null)
export const verifyCodeAtom = atom<number>(0)
export const spinnerStatusAtom = atom<boolean>(false)
export const subscriptionStatusAtom = atom<boolean>(false)
