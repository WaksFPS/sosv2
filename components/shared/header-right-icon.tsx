import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
interface IProps {
    iconName: string
}
export const HeaderRightIcon: React.FC<IProps> = (props) => {
    const { iconName } = props
    switch (iconName) {
        case 'home':
            return (
                <TouchableOpacity
                    onPress={() => router.push('/(auth)/dashboard')}
                >
                    <MaterialCommunityIcons
                        name="home"
                        size={28}
                        color="white"
                    />
                </TouchableOpacity>
            )
        case 'logout':
            return (
                <TouchableOpacity onPress={() => router.replace('/')}>
                    <MaterialCommunityIcons
                        name="logout"
                        size={28}
                        color="white"
                    />
                </TouchableOpacity>
            )
    }
}
