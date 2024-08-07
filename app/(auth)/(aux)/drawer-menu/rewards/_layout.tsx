import { Link, Slot, usePathname } from 'expo-router'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { cn } from '@/lib/util'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

interface NavigationItems {
    href: string
    title: string
}

const navigationItems: NavigationItems[] = [
    {
        href: '/drawer-menu/rewards/refer-friend',
        title: 'Refer a Friend',
    },
    {
        href: '/drawer-menu/rewards/referred-by-a-friend',
        title: 'Referred by a Friend',
    },
]

const RewardsLayout = () => {
    return (
        <>
            <ReferNavigation tabs={navigationItems} />
            <View className="flex-1 px-2.5 py-3">
                <Slot />
            </View>
        </>
    )
}

interface ReferNavigationProps {
    tabs: NavigationItems[]
}

const ReferNavigation: React.FC<ReferNavigationProps> = ({ tabs }) => {
    const pathName = usePathname()
    const safeArea = useSafeAreaInsets()
    return (
        <>
            <LinearGradient
                colors={['#FDC830', '#F57435']}
                className="h-1/6 rounded-3xl justify-center"
                style={{
                    paddingTop: safeArea.top,
                }}
            >
                <SafeAreaView>
                    <View className="flex-row mb-2 ml-8">
                        <Text className="mx-auto text-white font-bold text-xl">
                            Rewards
                        </Text>
                        <TouchableOpacity className="mr-2">
                            <Ionicons name="home" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                <View className="flex-row items-center justify-around mt-3">
                    <View className="flex-row items-center justify-center gap-2.5">
                        {tabs.map((tab, index) => (
                            <Link key={index} href={tab.href} asChild>
                                <TouchableOpacity>
                                    <Text
                                        className={cn(
                                            'text-white px-2.5 py-1.5',
                                            pathName === tab.href &&
                                                'text-background-alt bg-white rounded-full',
                                        )}
                                    >
                                        {tab.title}
                                    </Text>
                                </TouchableOpacity>
                            </Link>
                        ))}
                    </View>
                </View>
            </LinearGradient>
        </>
    )
}

export default RewardsLayout
