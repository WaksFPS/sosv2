import { BackButton } from '@/components/shared/back-button'
import { Button } from '@/components/shared/button'
import { Input } from '@/components/shared/input'
import TextScalable from '@/components/shared/text-scale'
import {
    HometownType,
    hometownSchema,
} from '@/services/endpoints/shared/schema'
import { updateUserFieldApi } from '@/services/endpoints/user'
import { MyLocationType } from '@/services/endpoints/user/schema'
import { authAtom } from '@/store/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { useAtomValue } from 'jotai'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
    TouchableOpacity,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const MyHometown = () => {
    const auth = useAtomValue(authAtom)
    const params = useLocalSearchParams<MyLocationType>()
    const hometownForm = useForm<HometownType>({
        defaultValues: {
            country: '',
            state: '',
            city: '',
        },
        values: params,
        mode: 'all',
        resolver: zodResolver(hometownSchema),
    })

    const updateHometownMu = useMutation({
        mutationFn: (data: HometownType) =>
            updateUserFieldApi({
                user_id: auth.user.userId,
                who_updated: auth.user.userId,
                upd_mode: 'USER_HOMETOWN',
                ...data,
            }),
        onSuccess: () => {
            router.dismissAll()
            router.replace('sign-up/questionnaire/complete-initial-profile')
        },
    })

    const handleNext = (data: HometownType) => {
        updateHometownMu.mutate(data)
    }

    const handleSkip = () => {
        router.dismissAll()
        router.replace('sign-up/questionnaire/complete-initial-profile')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            contentContainerStyle={{ flex: 1 }}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView className="flex-1 mx-4 items-center justify-between">
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
                            headerLeft: () => <BackButton />,
                            headerRight: () => (
                                <TouchableOpacity onPress={handleSkip}>
                                    <Text className="text-background-alt">
                                        Skip
                                    </Text>
                                </TouchableOpacity>
                            ),
                        }}
                    />
                    <View className="flex-1 w-full items-center justify-center">
                        <View>
                            <TextScalable
                                fontSize={25}
                                fontClassname="font-bold text-center text-sos-gray py-10"
                            >
                                Hometown
                            </TextScalable>
                        </View>

                        <View className="w-full">
                            <Controller
                                control={hometownForm.control}
                                name="country"
                                render={({ field, fieldState }) => (
                                    <Input
                                        containerClassName="my-1"
                                        placeholder="Country"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        errorMessage={fieldState.error?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={hometownForm.control}
                                name="state"
                                render={({ field, fieldState }) => (
                                    <Input
                                        containerClassName="my-1"
                                        placeholder="State"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        errorMessage={fieldState.error?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={hometownForm.control}
                                name="city"
                                render={({ field, fieldState }) => (
                                    <Input
                                        containerClassName="my-1"
                                        placeholder="City"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        errorMessage={fieldState.error?.message}
                                    />
                                )}
                            />
                        </View>
                    </View>
                    <View className="w-full">
                        <Button
                            onPress={hometownForm.handleSubmit(handleNext)}
                            isLoading={updateHometownMu.isPending}
                            disabled={
                                updateHometownMu.isPending ||
                                !hometownForm.formState.isValid
                            }
                        >
                            Next
                        </Button>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default MyHometown
