import { Button } from '@/components/shared/button'
import { SecureInput } from '@/components/shared/secure-input'
import TextScalable from '@/components/shared/text-scale'
import { UPD_MODE_USER_EMAIL_ADDRESS } from '@/dictionary/contants'
import { authLoginApi } from '@/services/endpoints/auth'
import { LoginType } from '@/services/endpoints/auth/schema'
import { sendOTPApi, updateUserApi } from '@/services/endpoints/user'
import {
    SendOTPType,
    UpdateMobileNumberFormType,
    updateMobileNumberFormSchema,
} from '@/services/endpoints/user/schema'
import { userDataAtom } from '@/store/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useAtomValue } from 'jotai'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Dimensions, View } from 'react-native'
import PhoneInput, { ICountry } from 'react-native-international-phone-number'

const ChangeMobileNumberPage = () => {
    const { width } = Dimensions.get('window')
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(
        null,
    )
    const [inputValue, setInputValue] = useState<string>('')
    const userData = useAtomValue(userDataAtom)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const changeMobileNumberForm = useForm<UpdateMobileNumberFormType>({
        mode: 'all',
        resolver: zodResolver(updateMobileNumberFormSchema),
    })
    const formValues = changeMobileNumberForm.watch()
    const handleSelectedCountry = (country: ICountry) => {
        setSelectedCountry(country)
    }

    const handleInputValue = (phoneNumber: string) => {
        setInputValue(phoneNumber)
        const formattedPhoneNumber = phoneNumber.replace(/\D/g, '')
        changeMobileNumberForm.setValue(
            'phoneNumber',
            (selectedCountry?.callingCode || '') + formattedPhoneNumber,
        )
    }

    const sendOTPMutation = useMutation({
        mutationFn: (data: SendOTPType) => sendOTPApi(data),
        onSuccess: () => {
            router.push({
                pathname: '(aux)/forgot-password/verify-code',
                params: {
                    userId: userData.user.userId,
                    phoneNumber: formValues.phoneNumber,
                    fromAuth: 'true',
                },
            })
        },
        onError: () => Alert.alert('Error', 'Something went wrong.'),
        onSettled: () => setIsLoading(false),
    })

    const loginMutation = useMutation({
        mutationFn: (data: LoginType) => authLoginApi(data),
        onSuccess: () => {
            if (userData) {
                sendOTPMutation.mutate({
                    user_id: userData.user.userId,
                    phone_no: formValues.phoneNumber.toString(),
                })
            }
        },
        onError: () => {
            setIsLoading(false)
            Alert.alert('Error', 'Incorrect password.')
        },
    })

    const onSubmit = () => {
        setIsLoading(true)
        loginMutation.mutate({
            email: userData.user.email,
            password: formValues.password,
        })
    }

    return (
        <>
            <TextScalable
                fontSize={19}
                fontClassname="font-bold pt-2 px-5 text-[#707070]"
            >
                Update My Mobile Number
            </TextScalable>
            <View className="flex-grow px-4">
                <View className="py-4">
                    <Controller
                        control={changeMobileNumberForm.control}
                        name="phoneNumber"
                        render={() => (
                            <PhoneInput
                                onChangePhoneNumber={handleInputValue}
                                selectedCountry={selectedCountry}
                                onChangeSelectedCountry={handleSelectedCountry}
                                defaultCountry="US"
                                value={inputValue}
                            />
                        )}
                    />
                    <View className="h-4" />
                    <Controller
                        control={changeMobileNumberForm.control}
                        name="password"
                        render={({ field }) => (
                            <SecureInput
                                placeholder="Password"
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </View>
            </View>
            <View className="self-center">
                <Button
                    onPress={changeMobileNumberForm.handleSubmit(onSubmit)}
                    isLoading={isLoading}
                    disabled={
                        formValues.password === undefined ||
                        formValues.phoneNumber === undefined ||
                        isLoading
                    }
                    buttonClassName="rounded-3xl mb-[20%]"
                    gradientColors={['#F37335', '#F37335']}
                    style={{
                        width: width * 0.58,
                    }}
                >
                    Save
                </Button>
            </View>
        </>
    )
}

export default ChangeMobileNumberPage
