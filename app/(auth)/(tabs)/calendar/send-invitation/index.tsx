import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

import { Button } from '@/components/shared/button'
import dayjs from 'dayjs'
import { Controller, useForm } from 'react-hook-form'
import {
    CreateCalendarEventsType,
    createCalendarEventSchema,
} from '@/services/endpoints/calendar/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createCalendarEvent } from '@/services/endpoints/calendar'
import { authAtom } from '@/store/auth'
import { useAtomValue } from 'jotai'
import { router, useLocalSearchParams } from 'expo-router'
import { getUserDataApi } from '@/services/endpoints/user'
import { LocationPicker } from '../-components/location-modal'
import { ReminderPicker } from '../-components/reminder-modal'
import DateTimePicker from '@react-native-community/datetimepicker'
import Avatar from '@/components/shared/avatar'
import { BrandedHeaderConnectUser } from '@/components/shared/branded-header-connect-user'

interface Time {
    period: any
    hours: number | null
    minutes: number | null
}

interface Location {
    event_place: string
    street: string
    city: string
    state: string
    zip_code: string
}

const SendInvitation: React.FC = () => {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [showTimePicker, setShowTimePicker] = useState(false)
    const [showLocationModal, setShowLocationModal] = useState(false)
    const [showReminderModal, setShowReminderModal] = useState(false)
    const [reminder, setReminder] = useState<string>('')
    const [date, setDate] = useState(dayjs())
    const auth = useAtomValue(authAtom)
    const params = useLocalSearchParams()
    const { connectionUserId } = params
    const [location, setLocation] = useState<Location>({
        event_place: '',
        street: '',
        city: '',
        state: '',
        zip_code: '',
    })
    const [readableTime, setReadableTime] = useState<string>('')

    const handleDateConfirm = (selectedDate?: Date) => {
        if (selectedDate) {
            const selectedDayjsDate = dayjs(selectedDate)
            setDate(selectedDayjsDate)
            setShowDatePicker(false)
            setShowTimePicker(true)
        }
    }

    const handleTimeConfirm = (selectedTime?: Date) => {
        createEventForm.setValue('user_id', auth.user.userId)
        createEventForm.setValue('connection_user_id', Number(connectionUserId))

        if (selectedTime) {
            const selectedDayjsTime = dayjs(selectedTime)
            const combinedDateTime = date
                .set('hour', selectedDayjsTime.hour())
                .set('minute', selectedDayjsTime.minute())

            setDate(combinedDateTime)
            setShowTimePicker(false)

            const formattedDate = combinedDateTime.format(
                'ddd, MMMM D, YYYY h:mma',
            )
            const dateStart = combinedDateTime.unix()
            const dateEnd = combinedDateTime.endOf('day').unix()

            setReadableTime(formattedDate)
            createEventForm.setValue('date_start', dateStart)
            createEventForm.setValue('date_end', dateEnd)
        }
    }
    const createCalendarMutation = useMutation({
        mutationFn: (data: CreateCalendarEventsType) =>
            createCalendarEvent(data),
        onSuccess: (data) => {
            Alert.alert('Success', 'Event created successfully')
            router.push('/calendar')
        },
        onError: () => {
            Alert.alert('Error', 'The user is not connected to that person')
        },
    })

    const onSubmit = (data: CreateCalendarEventsType) => {
        if (
            !location.city ||
            !location.event_place ||
            !location.state ||
            !location.street ||
            !location.zip_code
        ) {
            Alert.alert('Error', 'Please complete the location first, thanks')
        } else {
            createCalendarMutation.mutate(data)
        }
    }

    const createEventForm = useForm<CreateCalendarEventsType>({
        mode: 'all',
        resolver: zodResolver(createCalendarEventSchema),
    })

    const openCalendar = () => {
        setShowDatePicker(true)
    }

    const handleLocationConfirm = () => {
        createEventForm.setValue('event_place', location.event_place)
        createEventForm.setValue('street', location.street)
        createEventForm.setValue('city', location.city)
        createEventForm.setValue('state', location.state)
        createEventForm.setValue('zip_code', location.zip_code)
        setShowLocationModal(false)
    }

    const openPickLocation = () => {
        setShowLocationModal(true)
    }

    const handleReminderSelect = (selectedReminder: string) => {
        setReminder(selectedReminder)
    }

    const openPickReminder = () => {
        setShowReminderModal(true)
    }

    const confirmReminder = (reminder: string | null) => {
        switch (reminder) {
            case 'No reminder':
                createEventForm.setValue('reminder', 0)
                break
            case 'At event':
                createEventForm.setValue('reminder', 1)
                break
            case '15 minutes':
                createEventForm.setValue('reminder', 15)
                break
            case '30 minutes':
                createEventForm.setValue('reminder', 30)
                break
            case '1 hour':
                createEventForm.setValue('reminder', 60)
                break
            case '3 hours':
                createEventForm.setValue('reminder', 180)
                break
            case '6 hours':
                createEventForm.setValue('reminder', 360)
                break
            case '12 hours':
                createEventForm.setValue('reminder', 720)
                break
            default:
                createEventForm.setValue('reminder', 0)
        }
        setShowReminderModal(false)
    }

    const getUserParam = {
        user_id: Number(connectionUserId),
    }
    const connectionData = useQuery({
        queryKey: ['connectionData', getUserParam],
        queryFn: () => getUserDataApi(Number(connectionUserId)),
    })

    if (createCalendarMutation.isPending || connectionData.isLoading) {
        return (
            <View className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-gray-800/50">
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }

    if (!connectionData.data) {
        Alert.alert('Error', 'User not found', [
            { text: 'Ok', onPress: () => router.push('/calendar') },
        ])
        return null
    }

    return (
        <View className="flex-1">
            <BrandedHeaderConnectUser
                title="Send Invitation"
                connectedUser={connectionData.data.userDetail.user}
            />
            <View className="h-full">
                <View className="flex-row justify-start gap-1 pt-1 my-1 w-full pl-2">
                    <View className="flex-col gap-5">
                        <Text className="font-bold text-base text-gray-500 mb-2">
                            DATE/TIME:
                        </Text>
                        <Text className="font-bold text-base text-gray-500 mb-2">
                            EVENT:
                        </Text>
                        <Text className="font-bold text-base text-gray-500 mb-2">
                            LOCATION:
                        </Text>
                        <Text className="font-bold text-base text-gray-500 mb-2">
                            REMINDER:
                        </Text>
                        <Text className="font-bold text-base text-gray-500 mb-2">
                            LOCAL CALENDAR:
                        </Text>
                    </View>
                    <View className="flex flex-col gap-5 ">
                        <TouchableOpacity onPress={openCalendar}>
                            <Text className="font-bold text-base text-orange-500 mb-2 ">
                                {!readableTime ? 'Set' : readableTime}
                            </Text>
                        </TouchableOpacity>
                        <Controller
                            control={createEventForm.control}
                            name="meetup_name"
                            render={({ field, fieldState }) => (
                                <TextInput
                                    className="font-bold text-base text-gray-400 border-b border-gray-500 w-4/5 ml-5 mb-1 my-2 mt-4"
                                    placeholder="Event Name"
                                    value={field.value}
                                    onChangeText={field.onChange}
                                    onBlur={field.onBlur}
                                />
                            )}
                        />
                        <TouchableOpacity onPress={openPickLocation}>
                            {location.event_place ? (
                                <Text className="font-bold text-base  text-gray-400 mb-2">
                                    {location.event_place}
                                </Text>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => setShowLocationModal(true)}
                                >
                                    <Text className="font-bold text-base text-orange-500 mb-2">
                                        Add
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openPickReminder}>
                            {!reminder ? (
                                <Text className="font-bold text-base text-orange-500 mb-2">
                                    Set Reminder
                                </Text>
                            ) : (
                                <Text className="font-bold text-base text-orange-500 mb-2">
                                    {reminder}
                                </Text>
                            )}
                        </TouchableOpacity>
                        <Text className="font-bold text-base text-gray-500 mb-2">
                            Coming Soon!
                        </Text>
                    </View>
                </View>
                <View className="pt-5 flex justify-center items-center w-full">
                    <Button
                        gradientColors={['#f57b3a', '#f57b3a']}
                        buttonClassName="rounded-full"
                        textClassName="px-10"
                        onPress={createEventForm.handleSubmit(onSubmit)}
                    >
                        Send Invitation
                    </Button>
                </View>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={date.toDate()}
                    mode="date"
                    display="default"
                    onChange={(_, date) => handleDateConfirm(date)}
                    maximumDate={new Date(2025, 12, 31)}
                    minimumDate={date.toDate()}
                />
            )}
            {showTimePicker && (
                <DateTimePicker
                    value={date.toDate()}
                    mode="time"
                    display="default"
                    onChange={(_, date) => handleTimeConfirm(date)}
                />
            )}
            <LocationPicker
                showLocationModal={showLocationModal}
                setLocation={setLocation}
                handleLocationConfirm={handleLocationConfirm}
                location={location}
            />
            <ReminderPicker
                showReminderModal={showReminderModal}
                handleReminderSelect={handleReminderSelect}
                confirmReminder={confirmReminder}
                reminder={reminder}
            />
        </View>
    )
}

export default SendInvitation
