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
                }}
            />
        </Tabs>
    )
}

export default TabLayout
