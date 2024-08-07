import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import NotificationSettings from '@/app/(auth)/(aux)/drawer-menu/settings/notification-settings'

const Settings = () => {
    return (
        <View>
            <LinearGradient
                colors={['#FDC830', '#F57435']}
                className="p-2 mb-2"
            >
                <SafeAreaView>
                    <View className="flex-row mb-2 ml-8">
                        <Text className="mx-auto color-white font-bold text-xl">
                            Settings
                        </Text>
                        <TouchableOpacity>
                            <Ionicons name="home" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                <View className="items-center justify-center"></View>
            </LinearGradient>
            <NotificationSettings
                settings={data}
            />
        </View>
    )
}

export default Settings

// Dummy data
const data = {
    chat: {
        name: 'Chat',
        isAlertOn: true,
        isSoundOn: false,
        isAlertState: 'isChatAlertOn',
        isSoundState: 'isChatSoundOn',
        field: 'chatSoundName',
    },
    voiceCall: {
        name: 'Voice Call',
        isAlertOn: true,
        isSoundOn: true,
        isAlertState: 'isVoiceCallAlertOn',
        isSoundState: 'isVoiceCallSoundOn',
        field: 'voiceCallSoundName',
    },
    videoCall: {
        name: 'Video Call',
        isAlertOn: false,
        isSoundOn: true,
        isAlertState: 'isVideoCallAlertOn',
        isSoundState: 'isVideoCallSoundOn',
        field: 'videoCallSoundName',
    },
    alerts: {
        name: 'Alerts',
        isAlertOn: false,
        isSoundOn: true,
        isAlertState: 'isNotifAlertOn',
        isSoundState: 'isNotifSoundOn',
        field: 'notifSoundName',
    },
}
