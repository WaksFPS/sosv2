import { useParticipant } from '@videosdk.live/react-native-sdk'
import { LargeVideoRTCView } from './LargeVideoRTCView'
import { useEffect } from 'react'

interface LargeViewProps {
    participantId: string
}

export const LargeView = (props: LargeViewProps) => {
    const { webcamOn, webcamStream, displayName, setQuality, isLocal } =
        useParticipant(props.participantId, {})

    useEffect(() => {
        setQuality('high')
        console.log('webcamOn', webcamOn)
        console.log('webcamStream', webcamStream)
    }, [])

    return (
        <LargeVideoRTCView
            isOn={webcamOn}
            stream={webcamStream}
            displayName={displayName}
            objectFit="cover"
            isLocal={isLocal}
        />
    )
}
