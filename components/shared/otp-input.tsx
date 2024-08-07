import React, { useState, useRef } from 'react'
import { View, TextInput } from 'react-native'
import { cn } from '@/lib/util'

interface OTPInputProps {
    containerClassName?: string
    onValueChange?: (otpValue: string) => void
}

const OTPInput = (props: OTPInputProps) => {
    const [otp, setOTP] = useState<string[]>(Array(6).fill(''))
    const [focusedIndex, setFocusedIndex] = useState<number>(-1)
    const inputRefs = useRef<TextInput[]>(Array(6).fill(null))

    const handleInputChange = (text: string, index: number) => {
        let newOTP = [...otp] // Define newOTP here
        if (text.length === 1) {
            newOTP[index] = text // Update newOTP instead of otp directly
            setOTP(newOTP)
            if (index < 5 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]!.focus()
            }
        } else if (text.length === 0) {
            newOTP[index] = '' // Update newOTP instead of otp directly
            setOTP(newOTP)
            if (index > 0 && inputRefs.current[index - 1]) {
                inputRefs.current[index - 1]!.focus()
            }
        }

        handleOTPChange(newOTP)
    }

    const handleOTPChange = (newOTP: string[]) => {
        props.onValueChange && props.onValueChange(newOTP.join(''))
    }

    const handleInputFocus = (index: number) => {
        setFocusedIndex(index)
    }

    return (
        <View
            className={cn(
                'flex flex-row gap-5 items-center',
                props.containerClassName,
            )}
        >
            {otp.map((digit, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref!)}
                    className={cn(
                        'border border-gray-300 p-2 w-10 text-center bg-white',
                        {
                            'border-2': true,
                            'border-primary': focusedIndex === index,
                        },
                    )}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onFocus={() => handleInputFocus(index)}
                    onChangeText={(text) => handleInputChange(text, index)}
                />
            ))}
        </View>
    )
}

export default OTPInput
