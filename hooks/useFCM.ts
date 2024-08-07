import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import useRNCallKeep from './useRNCallKeep'
import { VoipNotificationType } from '@/services/endpoints/shared/schema'
import RNCallKeep from 'react-native-callkeep'
import { Platform } from 'react-native'
import * as Linking from 'expo-linking'

const useFCM = () => {
    const RNFunc = useRNCallKeep()

    const incomingCallAnswer = (notifs: VoipNotificationType) => {
        console.log(' I have answered the call')

        RNFunc.endIncomingCallAnswer(notifs.uuid)
        Linking.openURL(
            `sosearch://caller-ui/incoming?token=${notifs.token}&meetingId=${notifs.meeting_id}&videoEnabled=${notifs.type === 'VID_DIA'}&name=${notifs.callerName}`,
        )
    }

    const endIncomingCall = (notifs: VoipNotificationType) => {
        // should update call thread and call status
        RNFunc.endIncomingCallAnswer(notifs.uuid)
    }

    const handleNotifType = (props: VoipNotificationType) => {
        switch (props.type) {
            case 'AUD_DIA':
            case 'VID_DIA':
                if (Platform.OS === 'ios') {
                    console.log('incoming call ios')
                    break
                }

                console.log('incoming call')
                RNFunc.configure({
                    incomingCallAnswer: () => incomingCallAnswer(props),
                    incomingCallEnd: () => endIncomingCall(props),
                })

                RNFunc.displayIncomingCall({
                    callerUUID: props.uuid,
                    hasVideo: props.type === 'VID_DIA',
                    callerName: props.callerName,
                })
                break
            case 'AUD_END':
            case 'VID_END':
                console.log('end call')
                RNFunc.rejectCall(props.uuid)
                break
            default:
                break
        }
    }

    useEffect(() => {
        messaging().onMessage(async (remoteMessage) => {
            console.log(
                'A new FCM message arrived!',
                JSON.stringify(remoteMessage),
            )

            const remoteMessageData =
                remoteMessage.data as unknown as VoipNotificationType
            handleNotifType(remoteMessageData)
        })

        RNCallKeep.addEventListener('didChangeAudioRoute', (data) => {
            console.log(data)
        })

        return () => {
            RNCallKeep.removeEventListener('didChangeAudioRoute')
        }
    }, [])
}

export default useFCM
