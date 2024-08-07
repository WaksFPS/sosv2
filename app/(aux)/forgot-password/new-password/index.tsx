import React, { useCallback, useEffect, useState } from 'react'
import {
    View,
    Text,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/shared/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/shared/button'
import { Link } from '@/components/shared/link'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PasswordRules } from './-component/password-rules'
import {
    NewPasswordType,
    ResetPasswordType,
    newPasswordSchema,
} from '@/services/endpoints/user/schema'
import { authLoginApi } from '@/services/endpoints/auth'
import { LoginType } from '@/services/endpoints/auth/schema'
import { useMutation } from '@tanstack/react-query'
import { resetPasswordApi } from '@/services/endpoints/user'
import { userAtom, verifyCodeAtom } from '@/store/user'
import { useAtomValue } from 'jotai'
import { router } from 'expo-router'
import { cn } from '@/lib/util'

const NewPasswordPage = () => {
    const { height, width } = Dimensions.get('screen')

    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false)

    const userDetails = useAtomValue(userAtom)
    const verifyCode = useAtomValue(verifyCodeAtom)
    const newPasswordForm = useForm<NewPasswordType>({
        mode: 'all',
        resolver: zodResolver(newPasswordSchema),
    })
    const password = newPasswordForm.watch('password')
    const repeatPassword = newPasswordForm.watch('confirmPassword')

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: LoginType) => authLoginApi(data),
        onSuccess: () => {
            Alert.alert(
                'Input Error',
                'New password must be different from current password.',
            )
            setIsLoading(false)
        },
        onError: () => {
            if (userDetails) {
                const data = {
                    user_id: userDetails.userId,
                    password: repeatPassword,
                    who_updated: userDetails.whoUpdated,
                    phone_no: parseInt(userDetails.phoneNo),
                    conf_code: verifyCode,
                }

                resetPasswordMutation.mutate(data)
            }
        },
    })

    const resetPasswordMutation = useMutation({
        mutationKey: ['reset-password'],
        mutationFn: (data: ResetPasswordType) => resetPasswordApi(data),
        onSuccess: () => {
            Alert.alert('Success', ' Your password is successfully changed.')
            router.push('/sign-in')
            setIsLoading(false)
        },
        onError: () => {
            setIsLoading(false)
            Alert.alert('Something went wrong.')
        },
    })

    const onSubmit = (password: NewPasswordType) => {
        setIsLoading(true)
        if (userDetails) {
            loginMutation.mutate({
                email: userDetails.email,
                password: password.confirmPassword,
            })
        }
    }
    return (
        <>
            <SafeAreaView className="h-full">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    contentContainerStyle={{ flex: 1 }}
                    style={{ flex: 1 }}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View className="flex-1 justify-evenly py-5 px-6 ">
                            <View className="flex-1 justify-center">
                                <Text className="font-bold text-2xl text-background-alt text-center pb-9 pt-7">
                                    Create a New Password
                                </Text>

                                <View>
                                    <Controller
                                        control={newPasswordForm.control}
                                        name="password"
                                        render={({ field, fieldState }) => {
                                            return (
                                                <>
                                                    <Input
                                                        placeholder="New Password"
                                                        value={field.value}
                                                        onChangeText={
                                                            field.onChange
                                                        }
                                                        onBlur={field.onBlur}
                                                        errorMessage={
                                                            fieldState.error
                                                                ?.message
                                                        }
                                                    />
                                                </>
                                            )
                                        }}
                                    />
                                </View>
                                <PasswordRules
                                    text={password}
                                    setIsPasswordValid={setIsPasswordValid}
                                />
                                <View className="flex-1 mb-14">
                                    {isPasswordValid && (
                                        <Controller
                                            control={newPasswordForm.control}
                                            name="confirmPassword"
                                            render={({ field, fieldState }) => (
                                                <Input
                                                    onChangeText={
                                                        field.onChange
                                                    }
                                                    placeholder="Confirm Password"
                                                    value={field.value}
                                                    onBlur={field.onBlur}
                                                    errorMessage={
                                                        fieldState.error
                                                            ?.message
                                                    }
                                                />
                                            )}
                                        />
                                    )}
                                </View>
                            </View>
                            <View className="px-10">
                                <Link
                                    type="link"
                                    href="/sign-in"
                                    textClassName={cn(
                                        'text-lg',
                                        newPasswordForm.formState.isDirty
                                            ? 'text-background-alt'
                                            : 'text-gray-400',
                                    )}
                                    buttonClassName="text-center pb-6"
                                >
                                    Cancel
                                </Link>
                                <Button
                                    onPress={newPasswordForm.handleSubmit(
                                        onSubmit,
                                    )}
                                    isLoading={isLoading}
                                    disabled={
                                        !isPasswordValid ||
                                        !newPasswordForm.formState.isValid ||
                                        isLoading
                                    }
                                    gradientColors={['#F37335', '#F37335']}
                                    buttonClassName="rounded-3xl self-center w-full"
                                >
                                    Next
                                </Button>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    )
}

export default NewPasswordPage
