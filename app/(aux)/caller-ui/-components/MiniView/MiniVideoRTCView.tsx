import Avatar from '@/components/shared/avatar'
import { RTCView, MediaStream } from '@videosdk.live/react-native-sdk'
import { Stream } from '@videosdk.live/react-native-sdk/types/stream'
import React from 'react'
import { View } from 'react-native'

interface MiniVideoRTCViewProps {
    displayName?: string
    isOn?: boolean
    stream: Stream
    isLocal?: boolean
}

export const MiniVideoRTCView = (props: MiniVideoRTCViewProps) => {
    return (
        <View
            style={{
                position: 'absolute',
                top: 10,
                right: 10,
                height: 160,
                aspectRatio: 0.7,
                borderRadius: 8,
                borderColor: '#ff0000',
                overflow: 'hidden',
            }}
        >
            {props.isOn && props.stream ? (
                <RTCView
                    objectFit="cover"
                    zOrder={1}
                    mirror={props.isLocal}
                    style={{ flex: 1, backgroundColor: '#424242' }}
                    streamURL={new MediaStream([props.stream.track]).toURL()}
                />
            ) : (
                <Avatar imageClassName="h-24 w-24" />
            )}
        </View>
    )
}
