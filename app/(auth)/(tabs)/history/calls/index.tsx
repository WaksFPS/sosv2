import { getCallLogsApi } from '@/services/endpoints/call'
import { authAtom } from '@/store/auth'
import { FlashList } from '@shopify/flash-list'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { View } from 'react-native'
import { CallLogElement } from './-components/call-log-element'

const Calls = () => {
    const auth = useAtomValue(authAtom)

    const callLogs = useQuery({
        queryKey: ['calls', auth.user?.userId],
        queryFn: () => getCallLogsApi({ userId: auth.user?.userId }),
    })

    return (
        <View className="w-full h-full">
            <FlashList
                data={callLogs.data?.callLogs}
                renderItem={({ item }) => <CallLogElement item={item} />}
                estimatedItemSize={100}
                ItemSeparatorComponent={() => <View className="h-2.5 " />}
            />
        </View>
    )
}

export default Calls
