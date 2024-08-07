import Avatar from '@/components/shared/avatar'
import { NotificationType } from '@/services/endpoints/notification/schema'
import { View, Text } from 'react-native'
import { formatToMonthDay } from '@/lib/time'
import { NotifMessage } from './notification-message'
import { NotifIcons } from './notification-icons'

export const NotificationElement = ({ item }: { item: NotificationType }) => {
    return (
        <View className="flex-row gap-2">
            <View>
                <Avatar
                    uri={item.notificationSender.user.mediaProfileReso?._100}
                />
            </View>
            <View className="items-start justify-center">
                <View className="flex-row gap-1">
                    <Text className="capitalize">
                        {item.notificationSender.user.userName}
                    </Text>
                    <View>
                        <NotifMessage type={item.notifType} />
                    </View>
                </View>
                <View className="flex-row items-center gap-1">
                    <View>
                        <NotifIcons type={item.notifType} />
                    </View>
                    <Text>{formatToMonthDay(item.whenAdded)}</Text>
                </View>
            </View>
        </View>
    )
}
