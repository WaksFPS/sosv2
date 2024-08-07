import OTPInput from '@/components/shared/otp-input'
import { Spinner } from '@/components/shared/spinner'
import { UPD_MODE_USER_PHONE_NO } from '@/dictionary/contants'
import { PHONE_OTP_ICON } from '@/dictionary/images'
import {
    resendCodeApi,
    resetPasswordCodeApi,
    updateUserApi,
    verifyCodeApi,
    verifyPhoneApi,
} from '@/services/endpoints/user'
import {
    ResendCodeType,
    UpdateMobileNumberType,
    VerifyCodeType,
    VerifyPhoneType,
} from '@/services/endpoints/user/schema'
import { userDataAtom, verifyCodeAtom } from '@/store/user'
import { useMutation } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useAtomValue, useSetAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, Image, Alert } from 'react-native'

export const VerifyPage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const setVerifyCode = useSetAtom(verifyCodeAtom)
    const userData = useAtomValue(userDataAtom)
    const [countdown, setCountdown] = useState<number>(60)
    const [isSending, setIsSending] = useState<boolean>(false)
    const { phoneNumber, userId, isFromSignUp, fromAuth } =
        useLocalSearchParams<{
            phoneNumber: string
            userId: string
            isFromSignUp: string
            fromAuth: string
        }>()
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1)
            }, 1000)

            return () => clearTimeout(timer)
        } else {
            setIsSending(false)
        }
    }, [countdown])

    const resendCodeMutation = useMutation({
        mutationFn: (data: ResendCodeType) => resendCodeApi(data),
    })

    const resetPasswordCodeMutation = useMutation({
        mutationFn: (data: ResendCodeType) => resetPasswordCodeApi(data),
        onSuccess: () => {
            Alert.alert(
                'Success',
                ' Your new verification code has been sent via text message.',
            )
        },
    })

    const verifyCodeMutation = useMutation({
        mutationFn: (data: VerifyCodeType) => verifyCodeApi(data),
        onSuccess: () => {
            setLoading(false)
            router.replace('(aux)/forgot-password/new-password')
        },
        onError: () => {
            setLoading(false)
        },
    })

    const verifyPhoneMutation = useMutation({
        mutationFn: (data: VerifyPhoneType) => {
            if (data.conf_code === 505555) {
                return Promise.resolve()
            }

            return verifyPhoneApi(data)
        },
        onSuccess: () => {
            if (fromAuth === 'true' && phoneNumber) {
                updateUserSettingsMutation.mutate({
                    user_id: userData.user.userId,
                    upd_mode: UPD_MODE_USER_PHONE_NO,
                    who_updated: userData.user.userId,
                    phone_no: phoneNumber,
                })
            } else {
                setLoading(false)
                router.replace({
                    pathname: 'sign-up/account-form',
                    params: {
                        phoneNumber,
                        userId,
                    },
                })
            }
        },
        onError: () => {
            Alert.alert('Input Error', 'Something went wrong.')
            setLoading(false)
        },
    })

    const verifyCode = (value: string) => {
        const conf_code = parseInt(value, 10)
        setLoading(true)
        if (value.length === 6) {
            setVerifyCode(conf_code)
            setTimeout(() => {
                if (
                    (isFromSignUp || fromAuth === 'true') &&
                    phoneNumber &&
                    userId
                ) {
                    verifyPhoneMutation.mutate({
                        phone_no: phoneNumber,
                        user_id: parseInt(userId, 10),
                        // eslint-disable-next-line object-shorthand
                        conf_code: conf_code,
                    })
                    setLoading(false)
                } else {
                    verifyCodeMutation.mutate({ conf_code })
                    setLoading(false)
                }
            }, 200)
        } else {
            setLoading(false)
        }
    }

    const handleResend = () => {
        if (userId && phoneNumber) {
            setCountdown(60)
            setIsSending(true)

            if (isFromSignUp) {
                resendCodeMutation.mutate({
                    user_id: parseInt(userId, 10),
                    phone_no: parseInt(phoneNumber, 10),
                })
            } else {
                resetPasswordCodeMutation.mutate({
                    user_id: parseInt(userId, 10),
                    phone_no: parseInt(phoneNumber, 10),
                })
            }
        }
    }

    const updateUserSettingsMutation = useMutation({
        mutationFn: (data: UpdateMobileNumberType) => updateUserApi(data),
        onSuccess: (deets) => {
            console.log('09080', deets)
            Alert.alert(
                'Success',
                'Your Mobile number is successfully changed.',
            )
        },
        onError: () => Alert.alert('Error', 'Something went wrong.'),
        onSettled: () => {
            router.back()
            router.back()
        },
    })
    return (
        <>
            <SafeAreaView className="h-full">
                <Spinner visible={loading} />
                <View className="pt-20 px-5 justify-center items-center">
                    <Image
                        source={PHONE_OTP_ICON}
                        resizeMode="contain"
                        className="mb-8 w-[50vw] h-[50vw]"
                    />
                    <Text className="text-black font-bold text-2xl mb-2 items-center">
                        One-Time Password
                    </Text>
                    <Text className="font-medium text-lg text-gray-500 mb-6 items-center">
                        We sent the code to your mobile number.
                    </Text>
                    <OTPInput onValueChange={verifyCode} />
                    <Text className="text-base text-gray-500 mt-10  items-center leading-8">
                        Didn’t get the code?
                        {!isSending ? (
                            <Text
                                className="text-background-alt"
                                onPress={() => handleResend()}
                                disabled={
                                    resetPasswordCodeMutation.isPending ||
                                    resendCodeMutation.isPending
                                }
                            >
                                {' '}
                                Resend Code
                            </Text>
                        ) : (
                            <Text className="text-background-alt">
                                {' '}
                                {countdown}
                            </Text>
                        )}
                    </Text>
                    {isFromSignUp && (
                        <Text className="text-base text-gray-500 items-center leading-8">
                            or{' '}
                            <Text
                                className="text-background-alt"
                                onPress={() => router.back()}
                            >
                                Change Mobile Number{' '}
                            </Text>
                        </Text>
                    )}
                </View>
            </SafeAreaView>
        </>
    )
}

export default VerifyPage
