import React from 'react'
import { View, Text, Dimensions } from 'react-native'

interface BadgeProps {
    color: string
    badgeCount: number
}

const Badge = (props: BadgeProps) => {
    const { color, badgeCount } = props
    const { height } = Dimensions.get('window')
    return (
        <View
            className={`absolute rounded-full self-end items-center justify-center ${color === '' ? `bg-red-600` : color}`}
            style={{
                right: '25%',
                zIndex: 1,
                top: height * 0.025,
                width: 29,
                height: 29,
            }}
        >
            <Text
                className={`text-white p-1 font-bold ${badgeCount > 9 ? 'text-sm' : 'text-base'} `}
            >
                {badgeCount > 99 ? '99+' : badgeCount}
            </Text>
        </View>
    )
}

export default Badge
