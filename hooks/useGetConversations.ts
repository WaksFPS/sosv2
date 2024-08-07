import { twilioClientAtom, twilioConversationsAtom } from '@/store/twilio'
import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'

export const useGetConversations = () => {
    const setConversations = useSetAtom(twilioConversationsAtom)
    const client = useAtomValue(twilioClientAtom)
    const [isLoading, setIsLoading] = useState(false)

    async function getConversations() {
        setIsLoading(true)

        if (!client) {
            setIsLoading(false)
            return { isLoading, getConversations }
        }

        try {
            const subscribed = await client.getSubscribedConversations()
            setConversations(subscribed)
        } finally {
            setIsLoading(false)
        }
    }

    return { isLoading, getConversations }
}
