import React from 'react'
import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native'

interface BackButtonProps {
    href?: string
    size?: number
    color?: string
}
export const BackButton = ({
    href,
    size = 24,
    color = '#F37335',
}: BackButtonProps) => {
    const handleRouting = () => {
        if (href) {
            router.replace(href)
            return
        }

        if (router.canGoBack()) {
            router.back()
            return
        }

        console.warn('Cannot go back or route')
    }
    return (
        <TouchableOpacity onPress={handleRouting}>
            <MaterialIcons name="chevron-left" size={size} color="color" />
        </TouchableOpacity>
    )
}
