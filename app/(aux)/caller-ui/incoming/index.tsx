import {
    MeetingConsumer,
    MeetingProvider,
} from '@videosdk.live/react-native-sdk'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Platform } from 'react-native'
import RNCallKeep from 'react-native-callkeep'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MeetingRoom } from './meeting-room'

type IncomingCallScreenParams = {
    token: string
    meetingId: string
    videoEnabled: string
    name: string
}

const IncomingCallScreen = () => {
    const params = useLocalSearchParams<IncomingCallScreenParams>()
    const router = useRouter()

    return (
        <SafeAreaView>
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
        </SafeAreaView>
    )
}

export default IncomingCallScreen
