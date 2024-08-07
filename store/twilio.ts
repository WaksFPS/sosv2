import { Client, Conversation, Paginator } from '@twilio/conversations'
import { atom } from 'jotai'
import { UserDetailType } from '@/services/endpoints/user/schema'

export const twilioConversationsAtom = atom<Paginator<Conversation> | null>(
    null,
)

export const conversationListAtom = atom((get) => {
    const twConversations = get(twilioConversationsAtom)
    if (twConversations === null) return []

    return twConversations.items.sort((a, b) => {
        if (a.dateUpdated && b.dateUpdated) {
            return (
                new Date(b.dateUpdated).getTime() -
                new Date(a.dateUpdated).getTime()
            )
        }
        return 0
    })
})

export const twilioClientAtom = atom<Client | null>(null)
export const twilioStatusAtom = atom('disconnected')

export const selectedConversationAtom = atom<Conversation | null>(null)

export const selectedUserAtom = atom<UserDetailType | null>(null)
