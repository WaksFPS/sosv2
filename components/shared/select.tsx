import RNPickerSelect from 'react-native-picker-select'
import { View, Text, StyleProp, ViewStyle } from 'react-native'
import { useState } from 'react'
import { cn } from '@/lib/util'

interface DropdownProps {
    errorMessage: any
    onValueChange: (value: any) => void
    items: { label: string; value: any }[]
    placeholder: string
    containerClassName?: string
    containerStyle?: StyleProp<ViewStyle>
    value: any
}

export const Dropdown = (props: DropdownProps) => {
    const { containerClassName, containerStyle, ...rest } = props

    return (
        <View
            className={cn(
                'bg-white border border-gray-400 rounded-xl p-2 flex-grow-0 h-14 justify-center',
                props.errorMessage ? 'bg-pink-200' : '',
                containerClassName,
            )}
        >
            <RNPickerSelect
                {...rest}
                onValueChange={(value) => {
                    props.onValueChange(value)
                }}
                placeholder={{ label: props.placeholder, value: null }}
                style={{
                    inputIOS: {
                        fontSize: 16,
                        paddingTop: 13,
                        paddingHorizontal: 10,
                        paddingBottom: 12,
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 4,
                        backgroundColor: 'white',
                        color: 'black',
                        paddingRight: 30, // to ensure the text is never behind the icon
                    },
                    inputAndroid: {
                        fontSize: 16,
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        borderWidth: 0.5,
                        borderColor: 'gray',
                        borderRadius: 8,
                        backgroundColor: 'white',
                        color: 'black',
                        paddingRight: 30, // to ensure the text is never behind the icon
                    },
                    iconContainer: {
                        top: 10,
                        right: 12,
                    },
                }}
            />
        </View>
    )
}
