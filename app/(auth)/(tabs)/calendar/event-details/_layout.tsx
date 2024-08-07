import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Tabs } from 'expo-router'

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'orange',
                headerShown: false,
                tabBarStyle: {
                    paddingTop: 10,
                },
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
                    href: '/calendar',
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            size={28}
                            name="calendar-outline"
                            color={color}
                        />
                    ),
                    tabBarButton: () => null,
                }}
            />
            <Tabs.Screen
                name="delete-tab"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            size={28}
                            name="trash-can"
                            color={color}
                        />
                    ),

                    href: '/calendar',
                }}
            />
        </Tabs>
    )
}

export default TabLayout
