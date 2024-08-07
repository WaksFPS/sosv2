import { Conversation, Message, Paginator } from '@twilio/conversations'

export interface MessagingNotificationProps {
    data: MessagingData
    from: string
    messageId: string
    sentTime: number
    ttl: number
}

interface MessagingData {
    dateSent: string
    identity: string
    isNotificationShowed: string
    itemId: string
    notifType: string
    senderId: string
    twi_body: string
    twi_title: string
}

/**
 * Send a message to a conversation
 * Note: this function returns the message in reverse order
 *
 */
export const getTwPaginationItems = async (props: {
    conversationProxy: Conversation
}): Promise<Paginator<Message>> => {
    const paginationMessages = await props.conversationProxy.getMessages(15)

    paginationMessages.items.reverse()

    return paginationMessages
}

export const getTwLastMessage = async (props: {
    conversationProxy: Conversation
}): Promise<Message | null> => {
    const paginationMessages = await props.conversationProxy.getMessages(1)

    return paginationMessages.items[0] || null
}
