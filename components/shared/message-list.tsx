import { Message, Paginator } from '@twilio/conversations'
import { Text, View } from 'react-native'
import Avatar from './avatar'
import { useAtomValue } from 'jotai'
import { selectedUserAtom } from '@/store/twilio'
import { authAtom } from '@/store/auth'
import { cn } from '@/lib/util'
import { formatToTime } from '@/lib/time'
import { FlashList } from '@shopify/flash-list'
import { useEffect, useState } from 'react'

interface MessageListProps {
    messages: Message[]
    handleNextItems: () => Promise<Paginator<Message> | undefined>
    isLoading: boolean
    isTyping: boolean
}

export const MessageList = (props: MessageListProps) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [currentPaginator, setCurrentPaginator] = useState<
        Paginator<Message> | undefined
    >()
    const selectedUser = useAtomValue(selectedUserAtom)
    const auth = useAtomValue(authAtom)

    const updatingNextItems = async () => {
        if (!props.handleNextItems) return
        const paginateNextItems = await props.handleNextItems()

        if (!paginateNextItems) return
        if (!paginateNextItems.hasPrevPage) return

        if (!currentPaginator) {
            setCurrentPaginator(paginateNextItems)
            setMessages([...messages, ...paginateNextItems.items.reverse()])
            return
        }

        if (!currentPaginator.hasPrevPage) return

        const newPaginatorItems = await currentPaginator.prevPage()

        setCurrentPaginator(newPaginatorItems)
        setMessages([...messages, ...newPaginatorItems.items.reverse()])
    }

    useEffect(() => {
        setCurrentPaginator(undefined)
        setMessages(props.messages)
    }, [props.messages])

    const MessageBubble = ({ item }: { item: Message }) => {
        const isMyself = auth.user.userId.toString() === item.author
        return (
            <View
                className={cn(
                    'space-x-2 flex-row items-center',
                    !isMyself ? 'justify-start' : 'justify-end',
                )}
            >
                {!isMyself ? (
                    <Avatar uri={selectedUser?.user.mediaProfileReso?._100} />
                ) : null}
                <View
                    className={cn(
                        'px-5 py-2 rounded-2xl',
                        !isMyself ? 'bg-gray-100' : 'bg-orange-500',
                    )}
                >
                    <Text
                        className={cn(
                            !isMyself ? 'text-gray-700' : 'text-gray-100',
                        )}
                    >
                        {item.body}
                    </Text>
                    <Text
                        className={cn(
                            !isMyself ? 'text-gray-700' : 'text-gray-100',
                        )}
                    >
                        {formatToTime(item.dateCreated || '')}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <>
            <FlashList
                inverted
                data={messages}
                ItemSeparatorComponent={() => <View className="h-4" />}
                estimatedItemSize={200}
                renderItem={MessageBubble}
                onEndReached={updatingNextItems}
            />
            {props.isTyping && (
                <View className="p-2.5">
                    <Text className="italic">Typing...</Text>
                </View>
            )}
        </>
    )
}
