import { Link, Slot, usePathname, useSegments } from 'expo-router'
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { cn } from '@/lib/util'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

interface NavigationItems {
    href: string
    title: string
    icon?: string
}

const navigationItems = [
    {
        href: '(aux)/view',
        title: 'Viewed Me',
    },
    {
        href: '(aux)/view/',
        title: 'Me',
        icon: 'heart-half-full', // Icon name for the middle item
    },
    {
        href: '(aux)/view/',
        title: "I've Viewed",
    },
]

const ViewLayout = () => {
    return (
        <>
            <ViewNavigation tabs={navigationItems} />
            <View className="flex-1 px-2.5 py-3">
                <Slot />
            </View>
        </>
    )
}

interface ViewNavigationProps {
    tabs: NavigationItems[]
}

const ViewNavigation = (props: ViewNavigationProps) => {
    const pathName = usePathname() // Get the current pathname
    return (
        <>
            <LinearGradient
                colors={['#FDC830', '#F57435']}
                className="h-1/6 rounded-b-3xl justify-around"
            >
                <View className="flex-row justify-around items-center mt-5">
                    <View>
                        <MaterialCommunityIcons
                            size={28}
                            name="menu"
                            color={'white'}
                        />
                    </View>
                    <View className="flex-row items-center justify-center">
                        <Text className="text-white font-bold text-lg">
                            Views
                        </Text>
                    </View>
                    <View>
                        <Text>
                            <MaterialCommunityIcons
                                size={28}
                                name="home"
                                color={'white'}
                            />
                        </Text>
                    </View>
                </View>
                <View className="flex-row items-center justify-center gap-2.5">
                    {props.tabs.map((item, index) => (
                        <Link key={index} href={item.href} className="px-3">
                            <View className="flex-row items-center">
                                {item.icon && (
                                    <MaterialCommunityIcons
                                        size={28}
                                        name={item.icon as any}
                                        color="red"
                                        style={{ transform: [{ scaleX: -1 }] }}
                                    />
                                )}
                                <Text className="text-white">{item.title}</Text>
                            </View>
                        </Link>
                    ))}
                </View>
            </LinearGradient>
        </>
    )
}

export default ViewLayout
