import Badge from '@/components/shared/badge'
import { Link } from 'expo-router'
import React from 'react'
import { Dimensions, TouchableOpacity, View, Text } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
interface DashboardMenuProps {
    icon: keyof typeof MaterialCommunityIcons.glyphMap
    menuTitle: string
    path: string
}

export const DashboardMenu: React.FC<DashboardMenuProps> = (props) => {
    const { width } = Dimensions.get('window')
    const { menuTitle, icon, path } = props

    return (
        <View
            className="items-center justify-center overflow-hidden h-1/3"
            style={{
                flexBasis: '50%',
                padding: 10,
            }}
        >
            <Link push href={path} asChild>
                <TouchableOpacity
                    className="items-center bg-white justify-center w-full"
                    style={{
                        borderRadius: width * 0.05,
                        elevation: 8,
                        flex: 1,
                    }}
                >
                    <Badge color="bg-background-alt" badgeCount={1} />
                    <View className="items-center justify-center">
                        <MaterialCommunityIcons
                            name={icon}
                            size={width * 0.2}
                            color="#707070"
                        />

                        <Text className="text-center font-bold text-lg text-background-alt ">
                            {menuTitle}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Link>
        </View>
    )
}
