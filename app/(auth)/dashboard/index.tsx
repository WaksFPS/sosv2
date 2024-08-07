import React, { Fragment } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { IMG_TEXT_LOGO_WHITE } from '@/dictionary/images'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { DashboardSettings } from './components/dashboard-settings'
import { DashboardMenu } from './components/dashboard-menus'
import { useNavigation, DrawerActions } from '@react-navigation/native'

interface DashboardMenuItem {
    id: number
    title: string
    icon: keyof typeof MaterialCommunityIcons.glyphMap
    path: string
}

const dashboardMenus: DashboardMenuItem[] = [
    {
        id: 1,
        title: 'Near Me',
        icon: 'map-marker',
        path: 'home',
    },
    {
        id: 2,
        title: 'Calendar',
        icon: 'calendar',
        path: 'calendar',
    },
    {
        id: 3,
        title: 'Shortlist',
        icon: 'heart-outline',
        path: 'shortlist',
    },
    {
        id: 4,
        title: 'Search',
        icon: 'magnify',
        path: 'search',
    },
    {
        id: 5,
        title: 'History',
        icon: 'message-outline',
        path: '/history/notifications',
    },
    {
        id: 6,
        title: 'Views',
        icon: 'eye-outline',
        path: 'view',
    },
]

const DashboardPage = () => {
    // const hasSubscriptionEnded = useAtomValue(subscriptionStatusAtom)

    // useEffect(() => {
    //     if (hasSubscriptionEnded) {
    //         Alert.alert(
    //             'Your subscription has expired',
    //             'Press continue to update your subscription.',
    //             [
    //                 {
    //                     text: 'Continue',
    //                     onPress: () => router.push('(aux)/membership'),
    //                 },
    //             ],
    //         )
    //     }
    // }, [])

    const navigation = useNavigation()
    return (
        <SafeAreaView className="h-full bg-gradient-yellow" edges={['top']}>
            <LinearGradient
                colors={['#FCC242', '#F69940', '#F1753E']}
                className="h-full flex-col items-center pt-5"
            >
                <View
                    className="w-full items-center justify-between"
                    style={{ paddingBottom: 9 }}
                >
                    <Image
                        source={IMG_TEXT_LOGO_WHITE}
                        resizeMode="contain"
                        className="w-[60%]"
                    />
                    <TouchableOpacity
                        className="absolute left-0 justify-center p-4"
                        onPress={() =>
                            navigation.dispatch(DrawerActions.openDrawer())
                        }
                    >
                        <MaterialCommunityIcons
                            size={28}
                            name="menu"
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
                <DashboardSettings />
                <View
                    className="flex-row flex-wrap"
                    style={{
                        flex: 4.5,
                        padding: 8,
                    }}
                >
                    {dashboardMenus.map((item) => (
                        <Fragment key={item.id}>
                            <DashboardMenu
                                menuTitle={item.title}
                                icon={item.icon}
                                path={item.path}
                            />
                        </Fragment>
                    ))}
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

export default DashboardPage
