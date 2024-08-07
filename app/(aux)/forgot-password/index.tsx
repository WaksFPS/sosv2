import { Button } from '@/components/shared/button'
import { Input } from '@/components/shared/input'
import { Link } from '@/components/shared/link'
import { cn, getPrivatePhoneNumber } from '@/lib/util'
import { forgetPasswordApi } from '@/services/endpoints/user'
import {
    ForgotPasswordType,
    forgotPasswordSchema,
} from '@/services/endpoints/user/schema'
import { userAtom } from '@/store/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useAtom } from 'jotai'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
    View,
    Text,
    Alert,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const ForgotPasswordPage = () => {
    const [userDetails, setUserDetails] = useAtom(userAtom)
    const forgotPasswordForm = useForm<ForgotPasswordType>({
        mode: 'all',
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    })

    const forgetPasswordMutation = useMutation({
        mutationFn: (data: ForgotPasswordType) => forgetPasswordApi(data),
        onSuccess: (data) => {
            setUserDetails(data.user)
            Alert.alert(
                'Account Confirmed!',
                `Your code is sent to ${getPrivatePhoneNumber(data.user.phoneNo)}.`,
                [
                    {
                        text: 'OK',
                        onPress: () =>
                            router.push({
                                pathname: '(aux)/forgot-password/verify-code',
                                params: {
                                    userId: data.user.userId,
                                    phoneNumber: data.user.phoneNo,
                                },
                            }),
                    },
                ],
            )
        },
        onError: () => {
            forgotPasswordForm.setError('email', {
                type: 'custom',
                message: 'Email does not exists.',
            })
        },
    })

    const onSubmit = (data: ForgotPasswordType) => {
        forgetPasswordMutation.mutate(data)
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
                        <View className="flex-grow py-5 px-8">
                            <View className="justify-center flex-1">
                                <Text className="font-bold text-background-alt text-3xl text-center pb-3 pt-2">
                                    Forgot Your Password
                                </Text>
                                <Text className=" text-gray-500 font-medium mb-3 text-center pb-3 pt-2 text-lg">
                                    Please provide the email address associated
                                    with your account.
                                </Text>
                                <Controller
                                    control={forgotPasswordForm.control}
                                    name="email"
                                    render={({ field, fieldState }) => (
                                        <Input
                                            placeholder="Email Address"
                                            keyboardType="email-address"
                                            value={field.value}
                                            onChangeText={field.onChange}
                                            onBlur={field.onBlur}
                                            errorMessage={
                                                fieldState.error?.message
                                            }
                                        />
                                    )}
                                />
                            </View>
                            <View className="px-10">
                                <Link
                                    type="link"
                                    href="/sign-in"
                                    textClassName={cn(
                                        'text-lg',
                                        !forgotPasswordForm.formState.isDirty
                                            ? 'text-background-alt'
                                            : 'text-gray-400',
                                    )}
                                    buttonClassName="text-center pb-6"
                                >
                                    Cancel
                                </Link>
                                <Button
                                    onPress={forgotPasswordForm.handleSubmit(
                                        onSubmit,
                                    )}
                                    isLoading={forgetPasswordMutation.isPending}
                                    disabled={
                                        !forgotPasswordForm.formState.isDirty ||
                                        forgetPasswordMutation.isPending
                                    }
                                    buttonClassName="rounded-3xl self-center w-full"
                                    gradientColors={['#F37335', '#F37335']}
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

export default ForgotPasswordPage
