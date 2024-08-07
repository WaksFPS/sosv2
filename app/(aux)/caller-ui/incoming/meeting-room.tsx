import {
    ReactNativeForegroundService,
    useMeeting,
} from '@videosdk.live/react-native-sdk'
import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { OneToOne } from '../-components/OneToOne'
import { LinearGradient } from 'expo-linear-gradient'

export const MeetingRoom = () => {
    const colors = ['#FDC830', '#F57435']
    const [isJoined, setJoinMeeting] = useState(false)
    const { join, changeWebcam, participants, leave } = useMeeting({
        onMeetingJoined: () => {
            setTimeout(() => {
                setJoinMeeting(true)
            }, 500)
        },
    })

    useEffect(() => {
        setTimeout(() => {
            if (!isJoined) {
                join()
            }
        }, 1000)

        return () => {
            leave()
            ReactNativeForegroundService.stopAll()
        }
    }, [])

    return isJoined ? (
        <OneToOne />
    ) : (
        <LinearGradient
            colors={colors}
            className="items-center justify-center h-full"
        >
            <Text>Connecting</Text>
        </LinearGradient>
    )
}
