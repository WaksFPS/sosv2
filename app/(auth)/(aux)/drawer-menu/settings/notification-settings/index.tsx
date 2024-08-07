import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AudioPicker from './-components/audio-picker'

interface NotificationSetting {
    name: string
    isAlertOn: boolean
    isSoundOn: boolean
    isAlertState: string
    isSoundState: string
    field: string
}

interface NotificationSettings {
    [key: string]: NotificationSetting
}

interface CardProps {
    settings: NotificationSettings
}

const NotificationSettings: React.FC<CardProps> = ({ settings }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [data, setData] = useState(settings)

    const toggleSettings = (
        settingsKey: string,
        settingsConfig: 'isAlertOn' | 'isSoundOn',
    ) => {
        const updatedData = { ...data }
        updatedData[settingsKey][settingsConfig] =
            !updatedData[settingsKey][settingsConfig]

        setData(updatedData)
    }

    return (
        <View>
            <TouchableOpacity
                className="flex-auto flex-col justify-center p-6 bg-white mx-4 mt-2 mb-5 rounded-2xl"
                style={{
                    shadowColor: 'black',
                    shadowOffset: {
                        height: 2,
                        width: 2,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 6,
                }}
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <View className="flex-row justify-between items-center">
                    <Text className="text-xl">Notification Settings</Text>
                    <Ionicons
                        name={isExpanded ? 'chevron-down' : 'chevron-forward'}
                        size={24}
                        color="#FA803D"
                    />
                </View>
            </TouchableOpacity>
            {isExpanded &&
                Object.keys(data).map((key: string, index: number) => (
                    <View
                        key={index}
                        className="flex-auto flex-row justify-between align-middle mx-4 items-center px-8"
                    >
                        <Text className="text-xl">{data[key].name}</Text>
                        <View className="flex-row">
                            <Ionicons
                                name={
                                    data[key].isSoundOn
                                        ? 'volume-medium'
                                        : 'volume-mute'
                                }
                                size={38}
                                color={
                                    data[key].isSoundOn ? '#F37335' : '#707070'
                                }
                                style={{ marginRight: 10 }}
                                onPress={() => {
                                    toggleSettings(key, 'isSoundOn')
                                }}
                            />
                            <Ionicons
                                name={data[key].isAlertOn ? 'eye' : 'eye-off'}
                                size={38}
                                color={
                                    data[key].isAlertOn ? '#F37335' : '#707070'
                                }
                                style={{ marginRight: 10 }}
                                onPress={() => {
                                    toggleSettings(key, 'isAlertOn')
                                }}
                            />
                            <AudioPicker />
                        </View>
                    </View>
                ))}
        </View>
    )
}

export default NotificationSettings
