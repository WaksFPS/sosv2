import { LOADING } from '@/dictionary/lottie'
import LottieView from 'lottie-react-native'
import React from 'react'
import { View, Dimensions } from 'react-native'
interface SpinnerProps {
    visible: boolean
}

export const Spinner: React.FC<SpinnerProps> = ({ visible }) => {
    const { height, width } = Dimensions.get('screen')
    if (!visible) return null
    return (
        <>
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999,
                }}
            >
                <View
                    style={{
                        width,
                        height,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <LottieView
                        source={LOADING}
                        autoPlay
                        loop
                        style={{ width: 30, height: 30 }}
                    />
                </View>
            </View>
        </>
    )
}
