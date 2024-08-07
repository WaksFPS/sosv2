import { Input } from '@/components/shared/input'
import { Controller, useForm } from 'react-hook-form'
import {
    Alert,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native'

import { PasswordRules } from '../../(aux)/forgot-password/new-password/-component/password-rules'
import { useState } from 'react'
import { Button } from '@/components/shared/button'
import {
    CheckUsernameType,
    RegistrationPasswordType,
    UpdateUserRegistrationType,
    UpdateUserSettingsType,
    registrationPasswordSchema,
} from '@/services/endpoints/user/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { checkUsernameApi, updateUserApi } from '@/services/endpoints/user'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import {
    DEFAULT_NOTIF_SOUNDNAME,
    UPD_MODE_USER_SETTING,
    UPD_MODE_USER_USERNAME_PASSWORD,
} from '@/dictionary/contants'
import { trimExtraSpaces } from '@/lib/util'
import { BackButton } from '@/components/shared/back-button'

export const AccountForm = () => {
    const { width } = Dimensions.get('screen')
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { phoneNumber, userId } = useLocalSearchParams<{
        phoneNumber: string
        userId: string
    }>()
    const registrationPasswordForm = useForm<RegistrationPasswordType>({
        mode: 'all',
        resolver: zodResolver(registrationPasswordSchema),
        defaultValues: {},
    })
    const watchedValues = registrationPasswordForm.watch()

    const updateUserRegistrationMutation = useMutation({
        mutationKey: ['update-user-registration'],
        mutationFn: (data: UpdateUserRegistrationType) => updateUserApi(data),
        onSuccess: () => {
            if (userId) {
                updateUserSettingsMutation.mutate({
                    user_id: parseInt(userId, 10),
                    upd_mode: UPD_MODE_USER_SETTING,
                    who_updated: parseInt(userId, 10),
                    is_general_sound_on: 1,
                    is_general_alert_on: 1,
                    is_reachability_status_on: 1,
                    is_chat_alert_on: 1,
                    is_chat_sound_on: 1,
                    is_voicecall_alert_on: 1,
                    is_voicecall_sound_on: 1,
                    is_videocall_alert_on: 1,
                    is_videocall_sound_on: 1,
                    is_notif_alert_on: 1,
                    is_notif_sound_on: 1,
                    chat_soundname: DEFAULT_NOTIF_SOUNDNAME,
                    voicecall_soundname: DEFAULT_NOTIF_SOUNDNAME,
                    videocall_soundname: DEFAULT_NOTIF_SOUNDNAME,
                    notif_soundname: DEFAULT_NOTIF_SOUNDNAME,
                })
            }
        },
        onError: () => {
            Alert.alert(
                'Error',
                'Sorry, an unexpected error occurred. Please try again later.',
            )
        },
    })

    const updateUserSettingsMutation = useMutation({
        mutationKey: ['update-user-settings'],
        mutationFn: (data: UpdateUserSettingsType) => updateUserApi(data),
        onSuccess: () => {
            setIsLoading(false)
            router.replace({
                pathname: '/sign-up/referral-screen',
                params: {
                    userId,
                },
            })
        },
        onError: () => {
            Alert.alert(
                'Error',
                'Sorry, an unexpected error occurred. Please try again later.',
            )
        },
    })

    const checkUsernameMutation = useMutation({
        mutationKey: ['check-username'],
        mutationFn: (data: CheckUsernameType) => checkUsernameApi(data),
        onSuccess: () => {
            if (userId && phoneNumber) {
                updateUserRegistrationMutation.mutate({
                    user_id: parseInt(userId, 10),
                    upd_mode: UPD_MODE_USER_USERNAME_PASSWORD,
                    who_updated: parseInt(userId, 10),
                    user_name: watchedValues.username,
                    password: watchedValues.confirmPassword,
                })
            }
        },
        onError: () => {
            setIsLoading(false)
            registrationPasswordForm.setError('username', {
                type: 'custom',
                message: 'Username is already used',
            })
        },
    })

    const onSubmit = async (data: RegistrationPasswordType) => {
        setIsLoading(true)
        const user_name = trimExtraSpaces(data.username)
        checkUsernameMutation.mutate({ user_name })
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
                            headerShown: false,
                        }}
                    />
                    <View className="flex-1 w-full items-center justify-center">
                        <View>
                            <Text className="font-bold text-2xl text-background-alt text-center">
                                Registration
                            </Text>
                            <Text className="text-gray-500 font-medium text-xl text-center  mt-4 mb-8">
                                Create a username and password for your account
                            </Text>
                        </View>

                        <View className="w-full">
                            <Controller
                                control={registrationPasswordForm.control}
                                name="username"
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <Input
                                                placeholder="Username"
                                                value={field.value}
                                                onChangeText={field.onChange}
                                                onBlur={field.onBlur}
                                                errorMessage={
                                                    fieldState.error?.message
                                                }
                                            />
                                        </>
                                    )
                                }}
                            />
                            <Text className="text-gray-500 pb-2">
                                Username should be at least 3-20 characters.
                            </Text>
                            <Controller
                                control={registrationPasswordForm.control}
                                name="password"
                                rules={{
                                    required: 'This field is required',
                                }}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <Input
                                                placeholder="New Password"
                                                value={field.value}
                                                onChangeText={field.onChange}
                                                onBlur={field.onBlur}
                                                errorMessage={
                                                    fieldState.error?.message
                                                }
                                            />
                                        </>
                                    )
                                }}
                            />

                            <PasswordRules
                                text={watchedValues.password}
                                setIsPasswordValid={setIsPasswordValid}
                            />

                            {isPasswordValid && (
                                <Controller
                                    control={registrationPasswordForm.control}
                                    name="confirmPassword"
                                    render={({ field, fieldState }) => (
                                        <Input
                                            onChangeText={field.onChange}
                                            placeholder="Confirm Password"
                                            value={field.value}
                                            onBlur={field.onBlur}
                                            errorMessage={
                                                fieldState.error?.message
                                            }
                                        />
                                    )}
                                />
                            )}
                        </View>
                    </View>
                    <View className="w-full">
                        <Button
                            onPress={registrationPasswordForm.handleSubmit(
                                onSubmit,
                            )}
                            isLoading={isLoading}
                            disabled={
                                !isPasswordValid ||
                                !registrationPasswordForm.formState.isValid ||
                                isLoading
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

export default AccountForm
