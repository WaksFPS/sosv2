import Avatar from '@/components/shared/avatar'
import { formatToRelativeTime } from '@/lib/time'
import { formatTwilioChannelName } from '@/lib/util'
import { getUserDataApi } from '@/services/endpoints/user'
import { getTwLastMessage } from '@/services/external/twilio'
import { authAtom } from '@/store/auth'
import { selectedConversationAtom, selectedUserAtom } from '@/store/twilio'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Conversation } from '@twilio/conversations'
import { router } from 'expo-router'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { View, Text, Pressable } from 'react-native'

export const ConversationItem = ({
    conversation,
}: {
    conversation: Conversation
    isLoading: boolean
}) => {
    const auth = useAtomValue(authAtom)
    const queryClient = useQueryClient()
    const setSelectedConversation = useSetAtom(selectedConversationAtom)
    const setSelectedUser = useSetAtom(selectedUserAtom)

    //Get the last messages from the conversation
    const getUserMessageQuery = useQuery({
        queryKey: ['chatUsersMessage', conversation.uniqueName],
        queryFn: () => getTwLastMessage({ conversationProxy: conversation }),
    })

    const getUserQuery = useQuery({
        queryKey: ['chatUsers', conversation.uniqueName],
        queryFn: () => getUserDataApi(formattedChannel!),
    })

    useEffect(() => {
        invalidateUserMessage()
    }, [conversation.lastMessage?.index])

    const handleOnPress = () => {
        if (!getUserQuery.data) return
        // Set the conversation to the atom
        setSelectedConversation(conversation)
        setSelectedUser(getUserQuery.data.userDetail)
        router.push('(auth)/(aux)/history/chat/chat-message')
    }

    const friendlyName = conversation?.friendlyName

    const formattedChannel = formatTwilioChannelName(
        friendlyName,
        auth.user.userId,
    )

    const invalidateUserMessage = async () => {
        await queryClient.invalidateQueries({
            queryKey: ['chatUsersMessage', conversation.uniqueName],
        })
    }

    const formatTime = conversation.dateUpdated
        ? formatToRelativeTime(conversation.dateUpdated)
        : ''

    if (getUserQuery.isPending && formattedChannel) {
        return <Text>Loading...</Text>
    }

    if (!formattedChannel || !getUserQuery.data) {
        return null
    }

    return (
        <Pressable onPress={handleOnPress} className="flex-row gap-2.5">
            <View>
                <Avatar
                    uri={
                        getUserQuery.data?.userDetail.user.mediaProfileReso
                            ?._100
                    }
                />
            </View>
            <View className="flex-1 flex-row items-center justify-between">
                <View>
                    <Text className="capitalize ">
                        {getUserQuery.data?.userDetail.user.userName}
                    </Text>

                    <Text className="text-gray-500 truncate">
                        {getUserMessageQuery.data?.author ===
                        auth.user.userId.toString()
                            ? 'You: '
                            : ''}
                        {getUserMessageQuery.data?.body || 'No messages'}
                    </Text>
                </View>
                <View>
                    <Text className="text-gray-500 text-xs">{formatTime}</Text>
                </View>
            </View>
        </Pressable>
    )
}
