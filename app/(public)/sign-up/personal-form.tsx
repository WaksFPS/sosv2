import React, { useState } from 'react'
import {
    View,
    Text,
    Modal,
    Keyboard,
    TouchableWithoutFeedback,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input } from '@/components/shared/input'
import { Dropdown } from '@/components/shared/select'
import PhoneInput, { ICountry } from 'react-native-international-phone-number'
import { Controller, useForm } from 'react-hook-form'
import { SignupType, signupSchema } from '@/services/endpoints/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/shared/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authSignUpApi } from '@/services/endpoints/auth'
import DateTimePicker from 'react-native-ui-datepicker'
import dayjs from 'dayjs'
import { router, Stack } from 'expo-router'
import { useSetAtom } from 'jotai'
import { userDataAtom } from '@/store/user'
import { authAtom } from '@/store/auth'

interface SignUpProps {}

const PersonalForm: React.FC<SignUpProps> = () => {
    const [showCalendarModal, setShowCalendarModal] = useState(false)
    const [date, setDate] = useState(dayjs())
    const [, setInputValue] = useState<string>('')
    const setAuth = useSetAtom(authAtom)
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(
        null,
    )
    const countryCodeLength = selectedCountry?.callingCode.length

    const openCalendarModal = () => {
        setShowCalendarModal(true)
    }

    const closeCalendarModal = () => {
        setShowCalendarModal(false)
    }

    const queryClient = useQueryClient()

    const signupform = useForm<SignupType>({
        mode: 'onBlur',
        resolver: zodResolver(signupSchema),
    })

    const handleSelectedCountry = (country: ICountry) => {
        setSelectedCountry(country)
    }

    const handleInputValue = (phoneNumber: string) => {
        setInputValue(phoneNumber)
        const formattedPhoneNumber = phoneNumber.replace(/\D/g, '')
        signupform.setValue(
            'phone_no',
            (selectedCountry?.callingCode || '') + formattedPhoneNumber,
        )
    }

    const signupMutation = useMutation({
        mutationFn: (data: SignupType) => authSignUpApi(data),
        onSuccess: (data) => {
            setAuth((prev) => ({
                ...prev,
                user: data.user,
                token: data.token.jwt,
            }))

            router.replace({
                pathname: '/(aux)/forgot-password/verify-code',
                params: {
                    phoneNumber: data.user.phoneNo,
                    userId: data.user.userId,
                    isFromSignUp: 'true',
                },
            })
        },
        onError: (error) => {
            console.log(error)
            Alert.alert(
                'Sign Up Error',
                'Sorry, an unexpected error occurred. Please try again later.',
            )
        },
    })

    const onSubmit = (data: SignupType) => {
        signupMutation.mutate(data)
    }

    const handleInputFinish = () => {
        Keyboard.dismiss() // Dismiss the keyboard when input is finished
    }

    const handleCalendarOnChange = (event: any, field: any) => {
        if (event) {
            const selectedDate = dayjs(event.date)
            const minAge = 18
            const age = dayjs().diff(selectedDate, 'year')
            const selectedDateFormat = selectedDate.format('YYYY-MM-DD')

            field.onChange(selectedDateFormat)
            signupform.setValue('who_added', 1)
            if (age >= minAge) {
                setDate(selectedDate)
            } else {
                Alert.alert(
                    'Input Error',
                    'Sorry, you need to be at least 18 years old to create an account.',
                )
            }
            closeCalendarModal()
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            contentContainerStyle={{ flex: 1 }}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={handleInputFinish}>
                <SafeAreaView className="flex-1 mx-4 items-center justify-between">
                    <Stack.Screen
                        options={{
                            headerShown: false,
                        }}
                    />
                    <View className="flex-1 items-center justify-center space-y-8">
                        <View>
                            <View>
                                <Text className="text-orange-500 text-4xl font-bold text-center">
                                    Join Today!
                                </Text>
                            </View>
                            <View>
                                <Text className="text-gray-500 text-lg px-12 text-center">
                                    Set up an account and find your perfect
                                    match.
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Controller
                                control={signupform.control}
                                name="first_name"
                                render={({ field, fieldState }) => (
                                    <Input
                                        containerClassName="my-1"
                                        placeholder="First Name"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        errorMessage={fieldState.error?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={signupform.control}
                                name="last_name"
                                render={({ field, fieldState }) => (
                                    <Input
                                        containerClassName="my-1"
                                        placeholder="Last Name"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        errorMessage={fieldState.error?.message}
                                    />
                                )}
                            />
                            <View className="flex flex-row justify-center">
                                <Controller
                                    control={signupform.control}
                                    name="gender"
                                    render={({ field, fieldState }) => (
                                        <Dropdown
                                            containerClassName="my-1 w-1/2 mx-1"
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                            }}
                                            items={[
                                                { label: 'Male', value: 'MAL' },
                                                {
                                                    label: 'Female',
                                                    value: 'FEM',
                                                },
                                            ]}
                                            placeholder="Gender"
                                            errorMessage={null}
                                            value={field.value}
                                        />
                                    )}
                                />
                                <Button
                                    onPress={openCalendarModal}
                                    className="bg-white border border-gray-400 rounded-xl p-2 flex-grow-0 h-14 justify-center w-1/2 mt-1"
                                    gradientColors={['#FFFFFF', '#FFFFFF']}
                                    textClassName={`text-gray-300 text-md font-normal ${date.format('YYYY-MM-DD') != dayjs().format('YYYY-MM-DD') && 'text-black'}`}
                                >
                                    {date.format('YYYY-MM-DD') ==
                                    dayjs().format('YYYY-MM-DD')
                                        ? 'Birthday'
                                        : date.format('YYYY-MM-DD')}
                                </Button>
                            </View>
                            <Controller
                                control={signupform.control}
                                name="email"
                                render={({ field, fieldState }) => (
                                    <Input
                                        containerClassName="my-1 mb-2"
                                        placeholder="Email"
                                        value={field.value}
                                        onChangeText={field.onChange}
                                        onBlur={field.onBlur}
                                        errorMessage={fieldState.error?.message}
                                    />
                                )}
                            />
                            <Controller
                                control={signupform.control}
                                name="phone_no"
                                render={({ field, fieldState }) => (
                                    <PhoneInput
                                        onChangePhoneNumber={handleInputValue}
                                        selectedCountry={selectedCountry}
                                        onChangeSelectedCountry={
                                            handleSelectedCountry
                                        }
                                        defaultCountry="US"
                                        value={field.value?.slice(
                                            countryCodeLength,
                                        )}
                                    />
                                )}
                            />
                        </View>
                    </View>

                    <View className="w-full">
                        <Button
                            textClassName="text-lg"
                            onPress={signupform.handleSubmit(onSubmit)}
                            isLoading={signupMutation.isPending}
                            disabled={
                                signupMutation.isPending ||
                                !signupform.formState.isDirty ||
                                !signupform.formState.isValid
                            }
                        >
                            Sign Up
                        </Button>
                    </View>

                    <Modal
                        visible={showCalendarModal}
                        animationType="slide"
                        onRequestClose={closeCalendarModal}
                        transparent
                    >
                        <View
                            className={`flex-1 justify-center items-center ${showCalendarModal && 'bg-gray-800/50'}`}
                        >
                            <Controller
                                control={signupform.control}
                                name="birthday"
                                render={({ field, fieldState }) => (
                                    <View className="bg-white rounded-2xl p-5 w-4/5">
                                        <DateTimePicker
                                            mode="single"
                                            date={date.toDate()}
                                            onChange={(event) =>
                                                handleCalendarOnChange(
                                                    event,
                                                    field,
                                                )
                                            }
                                        />
                                        <Button onPress={closeCalendarModal}>
                                            Close
                                        </Button>
                                    </View>
                                )}
                            />
                        </View>
                    </Modal>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default PersonalForm
