import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
    TextInput,
    TextInputProps,
    TouchableOpacity,
    Text,
    View,
} from 'react-native'

import { cn } from '@/lib/util'

interface CustomInputProps extends TextInputProps {
    className?: string
    errorMessage?: string
}

export const SecureInput = (props: CustomInputProps) => {
    const [isInputVisible, setIsInputVisible] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const { className, errorMessage, ...rest } = props

    const toggleInputVisibility = () => {
        setIsInputVisible(!isInputVisible)
    }

    return (
        <>
            <View
                className={cn(
                    'bg-white flex-grow-0 flex-row border border-gray-400 justify-center rounded-xl p-2 h-14',
                    errorMessage ? 'bg-pink-200' : '',
                    className,
                )}
            >
                <View className="flex-1 justify-center">
                    {isFocused || props.value ? (
                        <Text className="text-xs">{props.placeholder}</Text>
                    ) : null}
                    <TextInput
                        {...rest}
                        className="text-base"
                        secureTextEntry={!isInputVisible}
                        onFocus={(e) => {
                            setIsFocused(true)
                            props.onFocus && props.onFocus(e)
                        }}
                        onBlur={(e) => {
                            setIsFocused(false)
                            props.onBlur && props.onBlur(e)
                        }}
                        placeholder={isFocused ? '' : props.placeholder}
                    />
                </View>

                <TouchableOpacity
                    onPress={toggleInputVisibility}
                    className="justify-self-end self-center mr-2.5"
                >
                    <Ionicons
                        name={isInputVisible ? 'eye-off' : 'eye'}
                        size={24}
                        color="grey"
                    />
                </TouchableOpacity>
            </View>
            {errorMessage && (
                <Text className="text-red-500 ml-1 mt-1 text-base">
                    {errorMessage}
                </Text>
            )}
        </>
    )
}
