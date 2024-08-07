import { BackButton } from '@/components/shared/back-button'
import { Button } from '@/components/shared/button'
import TextScalable from '@/components/shared/text-scale'
import { CONFIRMATION_HOURGLASS } from '@/dictionary/images'
import { router, Stack, useFocusEffect } from 'expo-router'
import React from 'react'
import { View, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const CompleteInitialProfile = () => {
    const handleNext = () => {
        router.replace('sign-up/personal-questionnaire/my-height')
    }
    useFocusEffect(() => {
        Alert.alert(
            'Complete Your Profile',
            'Click "Confirm" to complete your profile, or "Skip" and set up your partial profile now. If you skip, you can always complete your profile on the "Side Menu" and choose what you want to update.',
            [
                {
                    text: 'Skip',
                    onPress: () => console.log('skip'),
                },
                { text: 'Confirm', onPress: () => console.log('continue') },
            ],
            { cancelable: false },
        )
    })
    return (
        <SafeAreaView className="flex-1 mx-4 items-center justify-between">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View className="flex-1 items-center justify-center space-y-4">
                <Image
                    source={CONFIRMATION_HOURGLASS}
                    className="w-32 h-40 object-contain"
                    resizeMode="contain"
                />
                <View>
                    <TextScalable fontSize={32} fontClassname="text-center">
                        Almost There!
                    </TextScalable>
                    <TextScalable
                        fontSize={16}
                        fontClassname="text-center text-gray-500 text-lg"
                    >
                        {` You've completed your initial Profile. \nNow, just one more step...`}
                    </TextScalable>
                </View>
            </View>
            <View className="w-full">
                <Button onPress={handleNext}>Next</Button>
            </View>
        </SafeAreaView>
    )
}

export default CompleteInitialProfile
