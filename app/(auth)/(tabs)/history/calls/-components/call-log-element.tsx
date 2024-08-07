import Avatar from '@/components/shared/avatar'
import { formatToRelativeTime } from '@/lib/time'
import { CallThreadType } from '@/services/endpoints/call/schema'
import { authAtom } from '@/store/auth'
import { useAtomValue } from 'jotai'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'

export const CallLogElement = ({ item }: { item: CallThreadType }) => {
    const auth = useAtomValue(authAtom)

    const isMyself = item.whoAdded === auth.user?.userId

    const handleCallType = (callType: string) => {
        switch (callType) {
            case 'AUD':
                return isMyself ? 'Outbound voice call' : 'Inbound voice call'
            case 'VID':
                return isMyself ? 'Outbound video call' : 'Inbound video call'
            default:
                return 'Unknown'
        }
    }

    return (
        <View className="flex-row items-center gap-2 mr-16">
            <View>
                <Avatar uri={item.userConnection.user.mediaProfileReso?._100} />
            </View>
            <View className="w-full">
                <View className="flex-row justify-between">
                    <Text className="capitalize text-gray-900">
                        {item.userConnection.user.userName}
                    </Text>
                    <Text>{formatToRelativeTime(item.whenAdded)}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-500">
                        {handleCallType(item.callType)}
                    </Text>
                    <View>
                        {isMyself ? (
                            <Feather
                                name="arrow-up-right"
                                size={24}
                                color="#991b1b"
                            />
                        ) : (
                            <Feather
                                name="arrow-down-left"
                                size={24}
                                color="#991b1b"
                            />
                        )}
                    </View>
                </View>
            </View>
        </View>
    )
}
