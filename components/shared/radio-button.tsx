import React from 'react'
import { View, Pressable } from 'react-native'
import ScalableText from './text-scale'
import { cn } from '@/lib/util'
interface RadioButtonProps {
    label: string
    selected: boolean
    onPress: () => void
    buttonOuterColor?: string
    buttonInnerColor?: string
    fontSize?: number
}

const RadioButton: React.FC<RadioButtonProps> = ({
    label,
    selected,
    onPress,
    buttonOuterColor,
    buttonInnerColor,
    fontSize,
}) => {
    return (
        <Pressable className="flex-row items-center mb-2" onPress={onPress}>
            <View
                className={cn(
                    `h-5 w-5 border-2 mr-4 border-sos-gray rounded-full items-center justify-center`,
                    buttonOuterColor,
                )}
            >
                {selected && (
                    <View
                        className={cn(
                            `h-3 w-3 bg-sos-gray rounded-full`,
                            buttonInnerColor,
                        )}
                    />
                )}
            </View>
            <ScalableText
                fontSize={fontSize ? fontSize : 16}
                fontClassname={cn(`ml-2 text-sos-gray font-semibold`)}
            >
                {label}
            </ScalableText>
        </Pressable>
    )
}

export default RadioButton
