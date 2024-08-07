import Avatar from '@/components/shared/avatar'
import { RTCView, MediaStream } from '@videosdk.live/react-native-sdk'
import { Stream } from '@videosdk.live/react-native-sdk/types/stream'

interface LargeVideoRTCViewProps {
    objectFit?: 'contain' | 'cover' | undefined
    displayName?: string
    isOn?: boolean
    stream: Stream
    isLocal?: boolean
}

export const LargeVideoRTCView = (props: LargeVideoRTCViewProps) => {
    console.log(
        'props',
        props.stream ? new MediaStream([props.stream.track]).toURL() : 'null',
    )
    return props.isOn && props.stream ? (
        <RTCView
            streamURL={new MediaStream([props.stream.track]).toURL()}
            objectFit={props.objectFit}
            mirror={props.isLocal}
            style={{ flex: 1, backgroundColor: 'black' }}
        />
    ) : (
        <Avatar imageClassName="h-24 w-24" />
    )
}
