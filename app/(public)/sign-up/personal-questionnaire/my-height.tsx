import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput, TouchableOpacity, View, Text } from 'react-native'
import { router, Stack } from 'expo-router'
import TextScalable from '@/components/shared/text-scale'
import { Button } from '@/components/shared/button'
import { BackButton } from '@/components/shared/back-button'
import { updateUserFieldApi } from '@/services/endpoints/user'
import { useMutation } from '@tanstack/react-query'
import { authAtom } from '@/store/auth'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'

const MyHeight = () => {
    const auth = useAtomValue(authAtom)
    const [feet, setFeet] = useState<number>(5)
    const [inches, setInches] = useState<number>(5)
    const [height, setHeight] = useState<string>('')

    const updateHeightMu = useMutation({
        mutationFn: () =>
            updateUserFieldApi({
                user_id: auth.user.userId,
                who_updated: auth.user.userId,
                upd_mode: 'USER_HEIGHT',
                height,
            }),
        onSuccess: () => {
            router.push('sign-up/personal-questionnaire/my-body-type')
        },
    })

    const handleSkip = () => {
        router.push('sign-up/personal-questionnaire/my-body-type')
    }

    const handleSubmit = () => {
        updateHeightMu.mutate()
    }

    useEffect(() => {
        setHeight(
            `${feet}${inches.toString().length === 1 ? `0${inches}` : inches}`,
        )
    }, [feet, inches])

    return (
        <SafeAreaView className="flex-1 mx-4 items-center justify-between">
            <Stack.Screen
                options={{
                    title: 'Personal Details (1/16)',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: '#F37335',
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                    headerLeft: () => <BackButton />,
                    headerRight: () => (
                        <TouchableOpacity onPress={handleSkip}>
                            <Text className="text-background-alt text-lg">
                                Skip
                            </Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <View className="flex-1 items-center justify-center space-y-10">
                <View>
                    <TextScalable
                        fontSize={32}
                        fontClassname="text-sos-gray font-bold"
                    >
                        Height
                    </TextScalable>
                </View>
                <View className="flex-row items-center justify-center space-x-10">
                    <View className="flex-row items-center justify-center">
                        <View className="w-8 border-b">
                            <TextInput
                                className="text-center text-4xl text-sos-gray"
                                value={feet.toString()}
                                onChangeText={(text) => setFeet(Number(text))}
                            />
                        </View>
                        <TextScalable
                            fontSize={18}
                            fontClassname="text-sos-gray"
                        >
                            ft
                        </TextScalable>
                    </View>
                    <View className="flex-row items-center justify-center">
                        <View className="w-8 border-b">
                            <TextInput
                                className="text-center text-4xl text-sos-gray"
                                value={inches.toString()}
                                onChangeText={(text) => setInches(Number(text))}
                            />
                        </View>
                        <TextScalable
                            fontSize={18}
                            fontClassname="text-sos-gray"
                        >
                            in
                        </TextScalable>
                    </View>
                </View>
            </View>
            <View className="w-full">
                <Button
                    onPress={handleSubmit}
                    isLoading={updateHeightMu.isPending}
                    disabled={
                        updateHeightMu.isPending || feet === 0 || inches === 0
                    }
                >
                    Next
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default MyHeight
