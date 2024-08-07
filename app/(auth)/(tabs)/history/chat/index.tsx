import { useGetConversations } from '@/hooks/useGetConversations'
import { conversationListAtom, twilioStatusAtom } from '@/store/twilio'
import { FlashList } from '@shopify/flash-list'
import { Conversation } from '@twilio/conversations'
import { useAtomValue } from 'jotai'
import { useCallback } from 'react'
import { Text } from 'react-native'
import { ConversationItem } from './-components/conversation-item'

const Chat = () => {
    const twStatus = useAtomValue(twilioStatusAtom)
    const twConversations = useAtomValue(conversationListAtom)
    const { isLoading, getConversations } = useGetConversations()

    const renderItems = useCallback(
        ({ item }: { item: Conversation }) => (
            <ConversationItem conversation={item} isLoading={isLoading} />
        ),
        [twConversations],
    )

    if (twStatus === 'connecting' && twConversations.length === 0) {
        return <Text>Connecting...</Text>
    }

    return (
        <FlashList
            data={twConversations}
            renderItem={renderItems}
            estimatedItemSize={300}
            onRefresh={() => getConversations()}
            refreshing={isLoading}
        />
    )
}

export default Chat
