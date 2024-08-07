import { getNotificationApi } from '@/services/endpoints/notification'
import { NotificationType } from '@/services/endpoints/notification/schema'
import { authAtom } from '@/store/auth'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { NOTIFICATION_TYPE_ENUM as NOTIF } from '@/dictionary/contants'
import { NotificationElement } from './-components/notification-element'

const IncludedNotificationType = [
    NOTIF.MESSAGE_SEND,
    NOTIF.VIDEO_SEND,
    NOTIF.CALENDAR_SEND,
    NOTIF.PHONE_SEND,
    NOTIF.CALENDAR_ACCEPT,
    NOTIF.PHONE_ACCEPT,
    NOTIF.VIDEO_ACCEPT,
    NOTIF.MESSAGE_ACCEPT,
    NOTIF.HEART_SEND,
]

const Notification = () => {
    return (
        <View className="flex-1 items-start justify-start">
            <NotificationList />
        </View>
    )
}

const NotificationList = () => {
    const [data, setData] = useState<NotificationType[]>([])
    const auth = useAtomValue(authAtom)

    const historyQuery = useQuery({
        queryKey: ['history-notification', auth.user.userId],
        queryFn: () => getNotificationApi(auth.user.userId),
    })

    useEffect(() => {
        if (historyQuery.data) {
            const filteredData = historyQuery.data.notification.filter((item) =>
                IncludedNotificationType.includes(item.notifType),
            )
            setData(filteredData)
        }
    }, [historyQuery.data])

    return (
        <View className="w-full h-full">
            <FlashList
                data={data}
                renderItem={({ item }) => <NotificationElement item={item} />}
                estimatedItemSize={100}
                ItemSeparatorComponent={() => <View className="h-2.5" />}
                ListEmptyComponent={() => (
                    <View>
                        <Text>No Notification</Text>
                    </View>
                )}
            />
        </View>
    )
}

export default Notification
