import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

interface PasswordRulesProps {
    text: string
    setIsPasswordValid: React.Dispatch<React.SetStateAction<boolean>>
}

export const PasswordRules: React.FC<PasswordRulesProps> = (props) => {
    const [has8Characters, setHas8Characters] = useState<boolean>(false)
    const [has1SpecialCharacter, setHas1SpecialCharacter] =
        useState<boolean>(false)
    const [has1Lowercase, setHas1Lowercase] = useState<boolean>(false)
    const [has1Uppercase, setHas1Uppercase] = useState<boolean>(false)
    const [has1Number, setHas1Number] = useState<boolean>(false)

    const validatePassword = (value: string) => {
        const has8Characters = value.length >= 8
        const has1Lowercase = /[a-z]/.test(value)
        const has1Uppercase = /[A-Z]/.test(value)
        const has1Number = /[0-9]/.test(value)
        const has1SpecialCharacter =
            /[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(value)

        setHas8Characters(has8Characters)
        setHas1Lowercase(has1Lowercase)
        setHas1Uppercase(has1Uppercase)
        setHas1Number(has1Number)
        setHas1SpecialCharacter(has1SpecialCharacter)

        return (
            has8Characters &&
            has1Lowercase &&
            has1Uppercase &&
            has1Number &&
            has1SpecialCharacter
        )
    }

    useEffect(() => {
        if (props.text !== undefined) {
            props.setIsPasswordValid(validatePassword(props.text))
        }
    }, [props.text])

    return (
        <>
            <View className="mb-2">
                <Text className="text-gray-500 h-8 ">
                    Password must contain:
                </Text>
                <View className="items-center flex-row px-4">
                    <MaterialCommunityIcons
                        size={20}
                        name="check"
                        color={`${has8Characters ? 'green' : 'gray'}`}
                    />
                    <Text>8 characters</Text>
                </View>
                <View className="items-center flex-row px-4">
                    <MaterialCommunityIcons
                        size={20}
                        name="check"
                        color={`${has1Lowercase ? 'green' : 'gray'}`}
                    />
                    <Text>1 lowercase</Text>
                </View>
                <View className="items-center flex-row px-4">
                    <MaterialCommunityIcons
                        size={20}
                        name="check"
                        color={`${has1Uppercase ? 'green' : 'gray'}`}
                    />
                    <Text>1 uppercase</Text>
                </View>
                <View className="items-center flex-row px-4">
                    <MaterialCommunityIcons
                        size={20}
                        name="check"
                        color={`${has1Number ? 'green' : 'gray'}`}
                    />
                    <Text>1 number</Text>
                </View>
                <View className="items-center flex-row px-4">
                    <MaterialCommunityIcons
                        size={20}
                        name="check"
                        color={`${has1SpecialCharacter ? 'green' : 'gray'}`}
                    />
                    <Text>1 special character</Text>
                </View>
            </View>
        </>
    )
}
