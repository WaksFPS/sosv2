import {
    View,
    TextInput,
    Text,
    TextInputProps,
    StyleProp,
    ViewStyle,
} from 'react-native'

import { cn } from '@/lib/util'
import { useState } from 'react'

interface CustomInputProps extends TextInputProps {
    errorMessage?: string
    inputClassName?: string
    containerClassName?: string
    containerStyle?: StyleProp<ViewStyle>
    inputStyle?: StyleProp<ViewStyle>
    hasPlaceholder?: boolean
}

export const Input = (props: CustomInputProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const {
        className,
        inputClassName,
        containerClassName,
        containerStyle,
        inputStyle,
        errorMessage,
        hasPlaceholder = false,
        ...rest
    } = props
    return (
        <>
            <View
                className={cn(
                    'bg-white border border-gray-400 rounded-xl p-2 flex-grow-0 h-14 justify-center',
                    errorMessage ? 'bg-pink-200' : '',
                    containerClassName,
                )}
                style={containerStyle}
            >
                {isFocused && !hasPlaceholder ? (
                    <Text className="text-xs">{props.placeholder}</Text>
                ) : null}
                <TextInput
                    {...rest}
                    className={cn('text-base', inputClassName)}
                    onFocus={(e) => {
                        setIsFocused(true)
                        props.onFocus && props.onFocus(e)
                    }}
                    onBlur={(e) => {
                        setIsFocused(false)
                        props.onBlur && props.onBlur(e)
                    }}
                    placeholder={
                        isFocused && !hasPlaceholder ? '' : props.placeholder
                    }
                    style={inputStyle}
                />
            </View>
            {errorMessage && (
                <Text className="text-red-500 ml-1 mt-1 text-base">
                    {errorMessage}
                </Text>
            )}
        </>
    )
}
