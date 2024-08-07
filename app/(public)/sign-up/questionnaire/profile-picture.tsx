import { Button } from '@/components/shared/button'
import TextScalable from '@/components/shared/text-scale'
import React from 'react'
import { View } from 'react-native'
import { router, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '@/components/shared/avatar'

const ProfilePicture = () => {
    const handleNext = () => {
        router.push('sign-up/questionnaire/complete-initial-profile')
    }

    return (
        <SafeAreaView className="flex-1 mx-4 items-center justify-center">
            <Stack.Screen
                options={{
                    title: 'About yourself',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: '#F37335',
                        fontSize: 24,
                        fontWeight: 'bold',
                    },
                }}
            />
            <View>
                <TextScalable
                    fontSize={25}
                    fontClassname="font-bold text-center text-sos-gray py-10"
                >
                    Profile Picture
                </TextScalable>
            </View>

            <View>
                <Avatar uri="" imageClassName="w-60 h-64" />
                <View className="self-center">
                    <Button style={{ width: 200 }}>Upload Photos</Button>
                </View>
            </View>
            <View>
                <Button style={{ width: 200 }} onPress={() => handleNext()}>
                    Next
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default ProfilePicture
