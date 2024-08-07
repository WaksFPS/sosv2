import {
    MeetingConsumer,
    MeetingProvider,
} from '@videosdk.live/react-native-sdk'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Platform } from 'react-native'
import RNCallKeep from 'react-native-callkeep'
import MeetingRoom from './meeting-room'

type OutgoingCallScreenParams = {
    token: string
    meetingId: string
    videoEnabled: string
    name: string
}

const OutgoingCall = () => {
    const params = useLocalSearchParams<OutgoingCallScreenParams>()
    const router = useRouter()

    return (
        <MeetingProvider
            token={params.token!}
            config={{
                meetingId: params.meetingId!,
                webcamEnabled: params.videoEnabled === 'true' || false,
                name: params.name!,
                micEnabled: true,
                multiStream: false,
                mode: 'CONFERENCE',
                notification: {
                    title: 'params.name!',
                    message: 'Call on going',
                },
            }}
        >
            <MeetingConsumer
                {...{
                    onMeetingLeft: () => {
                        Platform.OS === 'ios' && RNCallKeep.endAllCalls()
                        router.dismiss()
                    },
                }}
            >
                {() => {
                    return <MeetingRoom />
                }}
            </MeetingConsumer>
        </MeetingProvider>
    )
}

export default OutgoingCall
