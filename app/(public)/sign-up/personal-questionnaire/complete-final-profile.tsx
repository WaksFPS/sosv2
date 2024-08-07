import React from 'react'
import { Button } from '@/components/shared/button'
import TextScalable from '@/components/shared/text-scale'
import { CONFIRMATION_CONFETTI } from '@/dictionary/images'
import { router, Stack, useFocusEffect } from 'expo-router'
import { View, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const CompleteFinalProfile = () => {
    const handleNext = () => {
        router.replace('subscription')
    }

    return (
        <SafeAreaView className="flex-1 mx-4 items-center justify-between">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View className="flex-1 items-center justify-center space-y-4">
                <Image
                    source={CONFIRMATION_CONFETTI}
                    className="w-32 h-40 object-contain"
                    resizeMode="contain"
                />
                <View>
                    <TextScalable
                        fontSize={32}
                        fontClassname="text-center font-bold"
                    >
                        Congratulations!
                    </TextScalable>
                    <TextScalable
                        fontSize={16}
                        fontClassname="text-center text-gray-500 text-lg"
                    >
                        You're on your way. Now, let's explore your membership
                        options - a gateway to a world of exciting interactions.
                    </TextScalable>
                </View>
                <View>
                    <TextScalable
                        fontSize={16}
                        fontClassname="text-center text-gray-500 text-lg"
                    >
                        Just head over to the next screen to begin.
                    </TextScalable>
                </View>
            </View>
            <View className="w-full">
                <Button onPress={handleNext}>Next</Button>
            </View>
        </SafeAreaView>
    )
}

export default CompleteFinalProfile
