import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Tabs } from 'expo-router'

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'orange',
                tabBarStyle: {
                    paddingTop: 10,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="back"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            size={28}
                            name="chevron-left"
                            color={color}
                        />
                    ),
                    href: '/dashboard',
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            size={28}
                            name="message"
                            color={color}
                        />
                    ),
                    href: '(tabs)/history',
                }}
            />

            <Tabs.Screen
                name="view"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            size={28}
                            name="eye"
                            color={color}
                        />
                    ),
                    href: '(tabs)/view',
                }}
            />
            <Tabs.Screen
                name="search-user"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            size={28}
                            name="magnify"
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="calendar/index"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            size={27}
                            name="calendar-outline"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="calendar/invitation-view"
                options={{ href: null, tabBarStyle: { display: 'none' } }}
            />
            <Tabs.Screen
                name="calendar/event-details"
                options={{ href: null, tabBarStyle: { display: 'none' } }}
            />
            <Tabs.Screen
                name="calendar/send-invitation"
                options={{ href: null, tabBarStyle: { display: 'none' } }}
            />
            <Tabs.Screen
                name="calendar/invite-user-view/index"
                options={{ href: null, tabBarStyle: { display: 'none' } }}
            />
        </Tabs>
    )
}

export default TabLayout
