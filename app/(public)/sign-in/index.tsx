import {
    Text,
    ImageBackground,
    Image,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native'

import { Button } from '@/components/shared/button'
import { Input } from '@/components/shared/input'
import { Link } from '@/components/shared/link'
import { SecureInput } from '@/components/shared/secure-input'
import { IMG_TEXT_LOGO_WHITE, SIGN_IN_BACKGROUND } from '@/dictionary/images'
import { Controller, useForm } from 'react-hook-form'
import { LoginType, loginSchema } from '@/services/endpoints/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authLoginApi } from '@/services/endpoints/auth'
import { authAtom } from '@/store/auth'
import { useSetAtom } from 'jotai'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Login = () => {
    const queryClient = useQueryClient()
    const setAuth = useSetAtom(authAtom)

    const loginForm = useForm<LoginType>({
        mode: 'all',
        resolver: zodResolver(loginSchema),
    })

    const loginMutation = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: LoginType) => authLoginApi(data),
        onSuccess: (data) => {
            setAuth({
                token: data.token.jwt,
                authenticated: true,
                user: data.user,
            })
        },
        onError: () => {
            Alert.alert('Error', 'Invalid email or password')
        },
    })

    const onSubmit = (data: LoginType) => {
        loginMutation.mutate(data)
    }

    return (
        <SafeAreaView className="h-full">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                contentContainerStyle={{ flex: 1 }}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ImageBackground
                        source={SIGN_IN_BACKGROUND}
                        className="flex-1"
                    >
                        <View className="flex-1 justify-evenly">
                            <View className="items-center">
                                <Image source={IMG_TEXT_LOGO_WHITE} />
                            </View>
                            <View />
                            <View className="px-8">
                                <Controller
                                    control={loginForm.control}
                                    name="email"
                                    render={({ field, fieldState }) => (
                                        <Input
                                            editable={
                                                !loginMutation.isPending ||
                                                queryClient.isFetching() > 0
                                            }
                                            placeholder="Email"
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
                                <View className="h-4" />
                                <Controller
                                    control={loginForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <SecureInput
                                            editable={
                                                !loginMutation.isPending ||
                                                queryClient.isFetching() > 0
                                            }
                                            placeholder="Password"
                                            value={field.value}
                                            onChangeText={field.onChange}
                                            onBlur={field.onBlur}
                                        />
                                    )}
                                />
                                <View className="items-end">
                                    <Link
                                        type="link"
                                        href="(aux)/forgot-password"
                                        buttonClassName="p-0 py-2.5 w-36"
                                        textClassName="text-blue-600 text-base font-normal"
                                    >
                                        Forgot Password?
                                    </Link>
                                </View>
                                <View className="px-10">
                                    <Button
                                        buttonClassName="rounded-3xl"
                                        textClassName="text-lg"
                                        onPress={loginForm.handleSubmit(
                                            onSubmit,
                                        )}
                                        isLoading={
                                            loginMutation.isPending ||
                                            queryClient.isFetching() > 0
                                        }
                                        disabled={
                                            loginMutation.isPending ||
                                            queryClient.isFetching() > 0
                                        }
                                    >
                                        Sign In
                                    </Button>
                                </View>
                                <View className="h-4" />
                                <View className="items-center">
                                    <Text className="items-center">
                                        Not yet a member?{' '}
                                        <Link
                                            type="link"
                                            href="sign-up/legal-confirmation-screen"
                                            textClassName="text-blue-600 text-base font-normal"
                                        >
                                            Sign Up
                                        </Link>
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login
