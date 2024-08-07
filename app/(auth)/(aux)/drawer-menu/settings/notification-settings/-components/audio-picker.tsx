import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'

const AudioPicker = () => {
    const [selectedNotificationSound, setSelectedNotificationSound] = useState<
        null | string
    >(null)

    const handleAmountChange = async (value: string) => {
        setSelectedNotificationSound(value)
    }

    return (
        <RNPickerSelect
            onValueChange={handleAmountChange}
            items={[
                { label: 'Twitter', value: 'twitter' },
                { label: 'Water Drop', value: 'water_drop' },
                { label: 'Nature', value: 'nature' },
            ]}
            style={pickerSelectStyles}
            Icon={() => {
                return (
                    <Ionicons
                        name={'musical-notes'}
                        size={38}
                        color="#F37335"
                    />
                )
            }}
            useNativeAndroidPickerStyle={false}
        />
    )
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        paddingRight: 30,
        width: 28,
        opacity: 0,
    },
    inputAndroid: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        paddingRight: 30,
        width: 28,
        opacity: 0,
    },
    iconContainer: {
        right: 10,
    },
})

export default AudioPicker
