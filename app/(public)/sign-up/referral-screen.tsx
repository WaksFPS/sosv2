import { Button } from '@/components/shared/button'
import { Input } from '@/components/shared/input'
import { UPD_MODE_USER_REFERRED_BY } from '@/dictionary/contants'
import { REFERRAL_CODE_ICON } from '@/dictionary/images'
import { updateUserApi, verifyReferralCodeApi } from '@/services/endpoints/user'
import {
    UpdateUserReferralType,
    VerifyReferralCodeType,
    verifyReferralCodeSchema,
} from '@/services/endpoints/user/schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
    Text,
    Image,
    View,
    Dimensions,
    Alert,
    SafeAreaView,
} from 'react-native'

export const ReferralScreen = () => {
    const { width } = Dimensions.get('screen')
    const { userId } = useLocalSearchParams<{ userId: string }>()
    const referralCodeForm = useForm<VerifyReferralCodeType>({
        mode: 'all',
        resolver: zodResolver(verifyReferralCodeSchema),
        defaultValues: {
            referral_code: '',
            user_id: 0,
        },
    })

    const verifyReferralCodeMutation = useMutation({
        mutationFn: (data: VerifyReferralCodeType) =>
            verifyReferralCodeApi(data),
        onSuccess: () => {
            updateUserReferralMutation.mutate({
                user_id: parseInt(userId!, 10),
                who_updated: parseInt(userId!, 10),
                conf_code: referralCodeForm.getValues('referral_code'),
                upd_mode: UPD_MODE_USER_REFERRED_BY,
            })
        },
        onError: () => {
            Alert.alert(
                'Error',
                'Sorry, an unexpected error occurred. Please try again later.',
            )
        },
    })

    const updateUserReferralMutation = useMutation({
        mutationFn: (data: UpdateUserReferralType) => updateUserApi(data),
        onSuccess: () => {
            Alert.alert('Success', ' Referral code submitted successfully.')
        },
        onError: () => {
            Alert.alert(
                'Error',
                'Sorry, an unexpected error occurred. Please try again later.',
            )
        },
    })

    const handleReferralCode = (
        code: string,
        onChange: (...event: any[]) => void,
    ) => {
        onChange(code)

        if (code.length === 6 && userId) {
            verifyReferralCodeMutation.mutate({
                user_id: parseInt(userId, 10),
                referral_code: code,
            })
        }
    }

    return (
        <SafeAreaView className="flex-1 mx-4 items-center justify-center">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View className="items-center flex-1 justify-center">
                <Image source={REFERRAL_CODE_ICON} className="mb-5" />
                <Text className="text-background-alt text-lg font-medium text-center mb-10">
                    Did a friend refer you?
                </Text>
                <Controller
                    control={referralCodeForm.control}
                    name="referral_code"
                    render={({ field, fieldState }) => (
                        <Input
                            placeholder="Enter Referral Code"
                            value={field.value}
                            onChangeText={(event) => {
                                handleReferralCode(event, field.onChange)
                            }}
                            onBlur={field.onBlur}
                            errorMessage={fieldState?.error?.message}
                            containerClassName="border-background-alt"
                            inputClassName="w-40 text-center"
                            hasPlaceholder
                            maxLength={6}
                        />
                    )}
                />
            </View>
            <View className="w-full">
                <Link replace href="sign-up/thank-you-screen" asChild>
                    <Button>Skip</Button>
                </Link>
            </View>
        </SafeAreaView>
    )
}
export default ReferralScreen
//MENDWX
