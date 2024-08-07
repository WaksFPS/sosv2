import { Ionicons } from '@expo/vector-icons'
import { useCallback, useEffect, useState } from 'react'
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
    onSend?: () => void
    onInputChange?: (text: string) => void
}

export const ChatInput = (props: CustomInputProps) => {
    const [content, SetContent] = useState('')
    const [contentHeight, setContentHeight] = useState(0)
    const [prevContentHeight, setPrevContentHeight] = useState(0)
    const [isFocused, setIsFocused] = useState(false)

    const { className, ...rest } = props

    const handleOnChange = useCallback(
        (value: string) => {
            SetContent(value)
            props.onInputChange && props.onInputChange(value)
        },
        [props.onInputChange],
    )

    const handleOnSend = useCallback(() => {
        props.onSend && props.onSend()
        SetContent('')
    }, [])

    return (
        <View
            className={cn(
                'bg-white grow-0 flex-row border border-gray-400 justify-center rounded-xl p-2 h-14',
                className,
            )}
            style={{ height: Math.max(60, contentHeight + 20), maxHeight: 200 }}
        >
            <View className="flex-1 justify-center">
                {isFocused || props.value ? (
                    <Text className="text-xs">{props.placeholder}</Text>
                ) : null}

                <TextInput
                    value={content}
                    onChangeText={handleOnChange}
                    className={cn('text-base')}
                    onContentSizeChange={(e) => {
                        setContentHeight(e.nativeEvent.contentSize.height)
                    }}
                    onFocus={(e) => {
                        setIsFocused(true)
                        if (contentHeight === 30) {
                            setContentHeight(prevContentHeight)
                        }
                        props.onFocus && props.onFocus(e)
                    }}
                    onBlur={(e) => {
                        setIsFocused(false)
                        setPrevContentHeight(contentHeight)
                        setContentHeight(30)
                        props.onBlur && props.onBlur(e)
                    }}
                    placeholder={isFocused ? '' : props.placeholder}
                    style={{
                        height: Math.max(30, contentHeight),
                        maxHeight: 150,
                    }}
                    numberOfLines={4}
                />
            </View>
            <TouchableOpacity
                onPress={handleOnSend}
                className="justify-self-end self-center mr-2.5"
            >
                <Text className="text-background-alt text-lg font-bold">
                    Send
                </Text>
            </TouchableOpacity>
        </View>
    )
}
