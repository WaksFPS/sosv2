import { PasswordRules } from '@/app/(aux)/forgot-password/new-password/-component/password-rules'
import { Button } from '@/components/shared/button'
import { Link } from '@/components/shared/link'
import { SecureInput } from '@/components/shared/secure-input'
import TextScalable from '@/components/shared/text-scale'
import { authLoginApi } from '@/services/endpoints/auth'
import { LoginType } from '@/services/endpoints/auth/schema'
import { changePasswordApi } from '@/services/endpoints/user'
import {
    ChangePasswordFormType,
    ChangePasswordType,
    changePasswordFormSchema,
} from '@/services/endpoints/user/schema'
import { userDataAtom } from '@/store/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useAtomValue } from 'jotai'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Dimensions, View } from 'react-native'

export const ChangePasswordPage = () => {
    const { width, height } = Dimensions.get('window')
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const userData = useAtomValue(userDataAtom)
    const changePasswordForm = useForm<ChangePasswordFormType>({
        mode: 'all',
        resolver: zodResolver(changePasswordFormSchema),
    })

    const changePasswordWatch = changePasswordForm.watch()

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: LoginType) => authLoginApi(data),
        onSuccess: () => {
            if (userData) {
                const data = {
                    user_id: userData.user.userId,
                    current_password: changePasswordWatch.password,
                    new_password: changePasswordWatch.newPassword,
                }
                changePasswordMutation.mutate(data)
            }
        },
        onError: () => {
            setIsLoading(false)
            Alert.alert('Error', 'Incorrect password.')
        },
    })

    const changePasswordMutation = useMutation({
        mutationFn: (data: ChangePasswordType) => changePasswordApi(data),
        onSuccess: () => {
            Alert.alert('Success', ' Your password is successfully changed.')
            router.back()
            setIsLoading(false)
        },
        onError: () => {
            setIsLoading(false)
            Alert.alert('Something went wrong.')
        },
    })
    const onSubmit = (data: ChangePasswordFormType) => {
        setIsLoading(true)
        if (userData) {
            loginMutation.mutate({
                email: userData.user.email,
                password: data.password,
            })
        }
    }
    return (
        <>
            <TextScalable
                fontSize={19}
                fontClassname="font-bold pt-2 px-5 text-[#707070]"
            >
                Change My Password
            </TextScalable>
            <View
                style={{ paddingHorizontal: height * 0.03 }}
                className="flex-grow"
            >
                <View className="py-4">
                    <Controller
                        control={changePasswordForm.control}
                        name="password"
                        render={({ field, fieldState }) => (
                            <SecureInput
                                placeholder="Current Password"
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />
                    <View className="h-4" />
                    <Controller
                        control={changePasswordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                            <SecureInput
                                placeholder="New Password"
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                    {changePasswordWatch.newPassword !== undefined &&
                        changePasswordWatch.newPassword !== '' && (
                            <PasswordRules
                                text={changePasswordWatch.newPassword}
                                setIsPasswordValid={setIsPasswordValid}
                            />
                        )}

                    {changePasswordWatch.newPassword !== undefined &&
                        changePasswordWatch.newPassword !== '' &&
                        isPasswordValid && (
                            <Controller
                                control={changePasswordForm.control}
                                name="confirmPassword"
                                render={({ field, fieldState }) => (
                                    <SecureInput
                                        placeholder="Confirm New Password"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        errorMessage={fieldState.error?.message}
                                    />
                                )}
                            />
                        )}
                </View>
                <View className="pr-5 items-end flex-grow">
                    <Link
                        type="link"
                        href="/forgot-password"
                        buttonClassName="p-0 pb-2.5 w-36"
                        textClassName="text-blue-600 text-base font-normal"
                        className="items-end"
                    >
                        Forgot Password?
                    </Link>
                </View>
                <View className="self-center">
                    <Button
                        onPress={changePasswordForm.handleSubmit(onSubmit)}
                        isLoading={isLoading}
                        disabled={
                            !changePasswordForm.formState.isDirty ||
                            !changePasswordForm.formState.isValid ||
                            isLoading
                        }
                        buttonClassName="rounded-3xl  mb-[20%]"
                        gradientColors={['#F37335', '#F37335']}
                        style={{
                            width: width * 0.58,
                        }}
                    >
                        Save
                    </Button>
                </View>
            </View>
        </>
    )
}

export default ChangePasswordPage
