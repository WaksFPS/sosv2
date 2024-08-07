import { Button } from '@/components/shared/button'
import OTPInput from '@/components/shared/otp-input'
import { PHONE_OTP_ICON } from '@/dictionary/images'
import { axiosInstance } from '@/services/axios'
import { AuthType } from '@/services/endpoints/auth/schema'
import { billingUnsubscribeWipeApi } from '@/services/endpoints/billing'
import { resendCodeApi, verifyPhoneApi } from '@/services/endpoints/user'
import {
    ResendCodeType,
    VerifyPhoneType,
} from '@/services/endpoints/user/schema'
import { authAtom } from '@/store/auth'
import { mmkvClearAllKeys } from '@/store/mmkv'
import { twilioClientAtom } from '@/store/twilio'
import { userTokenTwilioAtom } from '@/store/user'
import { useMutation } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useSetAtom, useAtomValue } from 'jotai'
import React, { useEffect, useState } from 'react'
import { View, Image, Text, Dimensions, Alert } from 'react-native'

const UnsubscribeVerifyCodePage = () => {
    const [countdown, setCountdown] = useState<number>(60)
    const [isSending, setIsSending] = useState<boolean>(false)
    const [code, setcode] = useState<number>(0)
    const { width } = Dimensions.get('window')
    const setTwilioToken = useSetAtom(userTokenTwilioAtom)
    const setAuth = useSetAtom(authAtom)
    const twilioClient = useAtomValue(twilioClientAtom)
    const { user_id, phone_number } = useLocalSearchParams<{
        user_id: string
        phone_number: string
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
    const removeStates = async () => {
        setAuth({
            token: '',
            authenticated: false,
            user: {} as AuthType,
        })
        setTwilioToken('')
        mmkvClearAllKeys()
    }

    const removeTwClient = async () => {
        if (twilioClient) {
            try {
                twilioClient.removeAllListeners()
                await twilioClient.shutdown()
            } catch (e) {
                console.log('Error shutting down twilio client', e)
            }
        }
    }
    const verifyPhoneMutation = useMutation({
        mutationFn: (data: VerifyPhoneType) => verifyPhoneApi(data),
        onSuccess: () => {
            if (user_id) {
                billingUnsubscribe.mutate(parseInt(user_id, 10))
            }
        },
        onError: () => {
            Alert.alert('Error', 'Something went wrong.')
        },
    })
    const billingUnsubscribe = useMutation({
        mutationFn: (id: number) => billingUnsubscribeWipeApi(id),
        onSuccess: () => {
            //TODO: ADD REMOVE PUSH NOTIFICATION & GEOLOCATION PERMISSION ONCE IMPLEMENTED
            removeStates()
            removeTwClient()
            axiosInstance.defaults.headers.common['Authorization'] = ''
            router.push(
                '(aux)/drawer-menu/my-account/modify-subscription/unsubscribe/subscription-ended',
            )
        },
    })
    const resendCodeMutation = useMutation({
        mutationFn: (data: ResendCodeType) => resendCodeApi(data),
        onSuccess: () => setIsSending(false),
    })
    const handleResend = () => {
        setCountdown(60)
        setIsSending(true)
        if (user_id && phone_number) {
            resendCodeMutation.mutate({
                user_id: parseInt(user_id, 10),
                phone_no: parseInt(phone_number, 10),
            })
        }
    }
    const verifyCode = (value: string) => {
        setcode(parseInt(value, 10))
    }
    const handleSubmit = () => {
        if (user_id && phone_number && code) {
            verifyPhoneMutation.mutate({
                user_id: parseInt(user_id, 10),
                phone_no: phone_number,
                conf_code: code,
            })
        }
    }

    return (
        <>
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
            </View>
            <View className="self-center">
                <Button
                    //isLoading={isLoading}
                    disabled={
                        code.toString().length < 6 ||
                        billingUnsubscribe.isPending ||
                        verifyPhoneMutation.isPending
                    }
                    onPress={handleSubmit}
                    textClassName="text-xl"
                    buttonClassName="rounded-3xl mt-[20%] "
                    gradientColors={['#F37335', '#F37335']}
                    style={{
                        width: width * 0.58,
                    }}
                >
                    Proceed
                </Button>
            </View>
        </>
    )
}

export default UnsubscribeVerifyCodePage
