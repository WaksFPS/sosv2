import { StartCallVoipResponse } from '@/services/endpoints/streaming/schema'
import { atom } from 'jotai'

export const startedCallingAtom = atom<StartCallVoipResponse | null>(null)
