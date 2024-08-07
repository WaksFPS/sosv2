import { Link, Slot, usePathname, useSegments } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { cn } from '@/lib/util'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
    BrandedHeaderMenu,
    type NavigationItem,
} from '@/components/shared/branded-header-menu'

const navigationItems: NavigationItem[] = [
    {
        href: 'history/notifications',
        title: 'Notification',
    },
    {
        href: 'history/chat',
        title: 'Chat',
    },
    {
        href: 'history/calls',
        title: 'Call/Video',
    },
]

const HistoryLayout = () => {
    return (
        <>
            <BrandedHeaderMenu title="History" items={navigationItems} />
            <View className="flex-1 px-2.5 py-3">
                <Slot />
            </View>
        </>
    )
}

export default HistoryLayout
