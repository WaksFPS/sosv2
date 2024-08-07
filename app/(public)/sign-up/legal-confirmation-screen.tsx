import { Text, Image, View } from 'react-native'

import { Link } from '@/components/shared/link'
import { REGISTER_STOP } from '@/dictionary/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import Checkbox from '@/components/shared/checkbox'
import { Stack } from 'expo-router'
import { BackButton } from '@/components/shared/back-button'
import { cn } from '@/lib/util'

export const LegalConfirmationScreen = () => {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }

    return (
        <SafeAreaView className="flex-1 mx-4 items-center justify-between">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View className="flex-1 items-center justify-center space-y-8">
                <Image source={REGISTER_STOP} className="w-52 h-56" />
                <Text className="text-gray-500 text-4xl font-bold text-center">
                    But First
                </Text>
                <View className="items-center space-y-4">
                    <Text className="text-gray-500 text-base text-center">
                        Your privacy and security are important to us. {'\n'}
                        Please open and read our:
                    </Text>
                    <Link
                        href="/privacy-policy"
                        type="link"
                        className="text-xl"
                        textClassName="font-bold text-lg"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="/terms-and-condition"
                        type="link"
                        className="text-xl"
                        textClassName="font-bold text-lg"
                    >
                        Terms and Condition
                    </Link>
                </View>
                <View className="flex-row px-4">
                    <Checkbox
                        isChecked={isChecked}
                        onPress={handleCheckboxChange}
                        setIsChecked={setIsChecked}
                        innerColor="orange"
                    />
                    <Text className="text-gray-500 text-base">
                        I am at least 18 years old, and I have read and agree to
                        the Terms & Conditions and Privacy Policy for
                        S.O.Search.
                    </Text>
                </View>
            </View>
            <View className="w-full">
                <Link
                    href="/sign-up/personal-form"
                    textClassName="font-bold text-lg"
                    gradientColors={
                        !isChecked ? ['#b0b0b0', '#b0b0b0'] : undefined
                    }
                    containerClassName="px-0 py-0"
                    disabled={!isChecked}
                >
                    Next
                </Link>
            </View>
        </SafeAreaView>
    )
}

export default LegalConfirmationScreen
