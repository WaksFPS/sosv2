import { View, Text, Alert, TouchableOpacity, Platform } from 'react-native'
import { useMeeting } from '@videosdk.live/react-native-sdk'
import { LargeView } from './LargeView'
import { MiniView } from './MiniView'
import { Button } from '@/components/shared/button'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { useState } from 'react'

export const OneToOne = () => {
    const [toggle, setToggle] = useState(false)
    const {
        participants,
        localWebcamOn,
        localMicOn,
        end,
        changeWebcam,
        toggleWebcam,
        getWebcams,
        toggleMic,
    } = useMeeting({
        onError: (data) => {
            const { code, message } = data
            Alert.alert(`Error: ${code}: ${message}`)
        },
    })

    const participantIds = [...participants.keys()]

    const participantCount = participantIds ? participantIds.length : null

    const handleChangeWebcam = () => {
        if (Platform.OS === 'android') {
            setToggle(!toggle)
            changeWebcam(!toggle ? '0' : '1')
            return
        }

        changeWebcam()
    }

    return (
        <View className="items-center justify-center h-full">
            <View className="flex-1 w-full">
                {participantCount && participantCount > 1 ? (
                    <>
                        <LargeView participantId={participantIds[1]} />
                        <MiniView participantId={participantIds[0]} />
                    </>
                ) : participantCount === 1 ? (
                    <LargeView participantId={participantIds[0]} />
                ) : (
                    <Text>No participants</Text>
                )}
                <View className="absolute bottom-20 flex flex-row items-center justify-center w-full space-x-4">
                    <TouchableOpacity
                        className="bg-gray-600 h-14 w-14 rounded-full items-center justify-center"
                        onPress={() => toggleWebcam()}
                    >
                        {localWebcamOn ? (
                            <MaterialCommunityIcons
                                name="video"
                                size={28}
                                color="white"
                            />
                        ) : (
                            <MaterialCommunityIcons
                                name="video-off"
                                size={28}
                                color="white"
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-gray-600 h-14 w-14 rounded-full items-center justify-center"
                        onPress={() => toggleMic()}
                    >
                        {localMicOn ? (
                            <MaterialCommunityIcons
                                name="microphone"
                                size={28}
                                color="white"
                            />
                        ) : (
                            <MaterialCommunityIcons
                                name="microphone-off"
                                size={28}
                                color="white"
                            />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-gray-600 h-14 w-14 rounded-full items-center justify-center"
                        onPress={handleChangeWebcam}
                    >
                        <MaterialCommunityIcons
                            name="camera-switch"
                            size={28}
                            color="white"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="bg-red-600 h-14 w-14 rounded-full items-center justify-center"
                        onPress={() => end()}
                    >
                        <MaterialCommunityIcons
                            name="phone-hangup"
                            size={28}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
