import { twilioClientAtom, twilioStatusAtom } from '@/store/twilio'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useGetConversations } from './useGetConversations'

export const useTwilioListener = () => {
    const client = useAtomValue(twilioClientAtom)
    const setTwilioStatus = useSetAtom(twilioStatusAtom)
    const { getConversations } = useGetConversations()

    useEffect(() => {
        if (!client) return
        client.on('connectionStateChanged', (state) => {
            console.log('Twilio connection state changed', state)
            if (state === 'connected') {
                setTwilioStatus('connected')
                getConversations()
            }
            if (state === 'disconnected') {
                setTwilioStatus('disconnected')
            }
            if (state === 'connecting') {
                setTwilioStatus('connecting')
            }
            if (state === 'disconnecting') {
                setTwilioStatus('disconnecting')
            }
            if (state === 'denied') {
                setTwilioStatus('denied')
            }
        })

        client.on('messageAdded', () => {
            getConversations()
        })
    }, [client])
}
