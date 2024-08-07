import { useParticipant } from '@videosdk.live/react-native-sdk'
import React, { useEffect } from 'react'
import { MiniVideoRTCView } from './MiniVideoRTCView'

interface MiniViewProps {
    participantId: string
}

export const MiniView = (props: MiniViewProps) => {
    const { webcamOn, webcamStream, displayName, setQuality, isLocal } =
        useParticipant(props.participantId, {})

    useEffect(() => {
        setQuality('high')
    }, [])

    return (
        <MiniVideoRTCView
            isOn={webcamOn}
            stream={webcamStream}
            displayName={displayName}
            isLocal={isLocal}
        />
    )
}
