import { Button } from '@/components/shared/button'
import { CONFIRMATION_HANDSHAKE } from '@/dictionary/images'
import { router, Stack } from 'expo-router'
import React from 'react'
import { View, Image, Text, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const ThankYouScreen = () => {
    const { width } = Dimensions.get('screen')
    return (
        <SafeAreaView className="flex-1 mx-4 items-center justify-between">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View className="flex-1 justify-center">
                <View className="items-center flex-1 justify-center py-10 px-6">
                    <View>
                        <Image
                            source={CONFIRMATION_HANDSHAKE}
                            className="mb-10 w-[30vw] h-[30vw]"
                            resizeMode="contain"
                        />
                    </View>

                    <Text className="pb-10 text-3xl font-bold text-gray-500">
                        Thank You !
                    </Text>
                    <Text className="text-center text-gray-500 pb-5 text-lg">
                        Now tell us more about yourself so we can find people
                        who will like you for who you really are.
                    </Text>
                    <Text className="text-center text-gray-500 pb-10 text-lg">
                        You can always update your answers later.
                    </Text>
                </View>
            </View>
            <View className="w-full">
                <Button
                    onPress={() =>
                        router.replace('sign-up/questionnaire/my-status')
                    }
                >
                    Start
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default ThankYouScreen
