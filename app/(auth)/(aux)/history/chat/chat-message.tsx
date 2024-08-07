import { ChatInput } from '@/components/shared/chat-input'
import { MessageList } from '@/components/shared/message-list'
import { cn, formatTwilioChannelName } from '@/lib/util'
import { sendNotificationApi } from '@/services/endpoints/notification'
import { SendNotificationType } from '@/services/endpoints/notification/schema'
import { getTwPaginationItems } from '@/services/external/twilio'
import { authAtom } from '@/store/auth'
import { selectedConversationAtom, selectedUserAtom } from '@/store/twilio'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFocusEffect } from 'expo-router'
import { useAtomValue } from 'jotai'
import { useCallback, useState } from 'react'
import { View, Text, Platform, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ChatMessage = () => {
    const selectedConversation = useAtomValue(selectedConversationAtom)
    const selectedUser = useAtomValue(selectedUserAtom)
    const auth = useAtomValue(authAtom)
    const [newMessage, setNewMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false)

    const paginationItems = useQuery({
        queryKey: [
            'chatMessage',
            formatTwilioChannelName(
                selectedConversation!.uniqueName,
                auth.user.userId,
            ),
        ],
        queryFn: () =>
            getTwPaginationItems({
                conversationProxy: selectedConversation!,
            }),
        enabled: !!selectedConversation || !!selectedUser,
    })

    const invalidatePaginationItems = async () => {
        await paginationItems.refetch()
    }

    const sendNotifMu = useMutation({
        mutationKey: ['sendNotif', selectedConversation!.uniqueName],
        mutationFn: (data: SendNotificationType) => sendNotificationApi(data),
    })

    const handleNextItems = async () => {
        if (!paginationItems.data) return

        return await paginationItems.data.prevPage()
    }

    const handleOnChangeText = (text: string) => {
        if (!selectedConversation) {
            return
        }

        setNewMessage(text)
        selectedConversation.typing()
    }

    useFocusEffect(
        useCallback(() => {
            if (!selectedConversation) {
                return
            }
            selectedConversation.on('messageAdded', async () => {
                await invalidatePaginationItems()
            })

            selectedConversation.on('typingStarted', async () => {
                setIsTyping(true)
            })

            selectedConversation.on('typingEnded', async () => {
                setIsTyping(false)
            })

            return () => {
                selectedConversation.removeAllListeners()
            }
        }, []),
    )

    const sendMessageMu = useMutation({
        mutationKey: ['sendMessage', selectedConversation!.uniqueName],
        mutationFn: async () => {
            await sendMessage()
        },
        onError: (e) => {
            console.error('Error sending message', e)
            Alert.alert('Error sending message', e.message)
        },
        onSettled: () => {
            invalidatePaginationItems()
        },
    })

    const sendMessage = async () => {
        if (!newMessage || !selectedConversation || !selectedUser) {
            return
        }

        try {
            await selectedConversation.sendMessage(newMessage)
            await sendNotifMu.mutateAsync({
                sender_id: auth.user.userId,
                item_id: auth.user.userId,
                receiver_id: selectedUser.user.userId,
                receiver_name: selectedUser.user.userName,
                notif_type: 'CHT_SEN',
                title: 'New Message',
                body: newMessage,
                is_hidden: false,
            })
        } catch (e) {
            console.error('Error sending message', e)
        }
    }

    if (!paginationItems.data) {
        return <Text>No messages</Text>
    }

    return (
        <SafeAreaView
            edges={['bottom']}
            className={cn('flex-1 px-2.5', Platform.OS === 'android' && 'pb-4')}
        >
            <View className="flex-shrink h-[92%]">
                <MessageList
                    messages={paginationItems.data.items}
                    handleNextItems={handleNextItems}
                    isLoading={paginationItems.isLoading}
                    isTyping={isTyping}
                />
            </View>
            <ChatInput
                onInputChange={handleOnChangeText}
                onSend={sendMessageMu.mutate}
                placeholder="Type a message..."
                multiline
            />
        </SafeAreaView>
    )
}

export default ChatMessage
