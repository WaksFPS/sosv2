import { Button } from '@/components/shared/button'
import { Input } from '@/components/shared/input'
import { SecureInput } from '@/components/shared/secure-input'
import TextScalable from '@/components/shared/text-scale'
import { UPD_MODE_USER_EMAIL_ADDRESS } from '@/dictionary/contants'
import { authLoginApi } from '@/services/endpoints/auth'
import { LoginType, loginSchema } from '@/services/endpoints/auth/schema'
import { checkEmailApi, updateUserApi } from '@/services/endpoints/user'
import {
    CheckEmailType,
    UpdateEmailType,
} from '@/services/endpoints/user/schema'
import { userDataAtom } from '@/store/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useAtomValue } from 'jotai'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Dimensions, View } from 'react-native'

const ChangeEmailPage = () => {
    const { width } = Dimensions.get('window')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const userData = useAtomValue(userDataAtom)
    const changeEmailForm = useForm<LoginType>({
        mode: 'all',
        resolver: zodResolver(loginSchema),
    })
    const changeEmailFormWatch = changeEmailForm.watch()

    const updateUserSettingsMutation = useMutation({
        mutationFn: (data: UpdateEmailType) => updateUserApi(data),
        onSuccess: () => {
            Alert.alert('Success', 'Your email is successfully changed.')
            router.back()
        },
        onError: () => Alert.alert('Error', 'Something went wrong.'),
        onSettled: () => setIsLoading(false),
    })

    const loginMutation = useMutation({
        mutationFn: (data: LoginType) => authLoginApi(data),
        onSuccess: () => {
            if (userData) {
                updateUserSettingsMutation.mutate({
                    user_id: userData.user.userId,
                    upd_mode: UPD_MODE_USER_EMAIL_ADDRESS,
                    who_updated: userData.user.userId,
                    email: changeEmailFormWatch.email,
                })
            }
        },
        onError: () => {
            setIsLoading(false)
            Alert.alert('Error', 'Incorrect password.')
        },
    })

    const checkEmailMutation = useMutation({
        mutationFn: (data: CheckEmailType) => checkEmailApi(data),
        onSuccess: () => {
            loginMutation.mutate({
                email: userData.user.email,
                password: changeEmailFormWatch.password,
            })
        },
        onError: () => {
            setIsLoading(false)
            changeEmailForm.setError('email', {
                type: 'custom',
                message: 'This email is already used.',
            })
        },
    })

    const onSubmit = (data: LoginType) => {
        setIsLoading(true)
        checkEmailMutation.mutate({
            email: data.email,
        })
    }
    return (
        <>
            <TextScalable
                fontSize={19}
                fontClassname="font-bold pt-2 px-5 text-[#707070]"
            >
                Update Email Address
            </TextScalable>
            <View className="flex-grow px-4">
                <View className="py-4">
                    <Controller
                        control={changeEmailForm.control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <Input
                                placeholder="New Email Address"
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />
                    <View className="h-4" />
                    <Controller
                        control={changeEmailForm.control}
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
                    onPress={changeEmailForm.handleSubmit(onSubmit)}
                    isLoading={isLoading}
                    disabled={
                        !changeEmailForm.formState.isDirty ||
                        !changeEmailForm.formState.isValid ||
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

export default ChangeEmailPage
