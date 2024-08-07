import { cn } from '@/lib/util'
import React from 'react'
import { Text, Dimensions, StyleProp, TextStyle } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

//based on standard 5" screen
const BASE_WIDTH = 350

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size

interface ScalableTextProps {
    fontSize: number
    fontClassname?: string
    children: React.ReactNode
    customStyle?: StyleProp<TextStyle>
    numberOfLines?: number
}

const TextScalable: React.FC<ScalableTextProps> = ({
    fontSize,
    fontClassname: fontStyle,
    children,
    customStyle,
    numberOfLines,
}) => {
    return (
        <Text
            className={cn(`${fontStyle}`)}
            style={[{ fontSize: scale(fontSize) }, customStyle]}
            numberOfLines={numberOfLines}
            ellipsizeMode="tail"
        >
            {children}
        </Text>
    )
}

export default TextScalable
