import React, { useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'

import DateTimePicker from 'react-native-ui-datepicker'
import dayjs from 'dayjs'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, router, usePathname } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { NO_EVENTS } from '@/dictionary/images'
import { authAtom } from '@/store/auth'
import { useAtomValue } from 'jotai'
import { getCalendarEvents } from '@/services/endpoints/calendar'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LoadingScreen } from './-components/loading-component'
import {
    BrandedHeaderMenu,
    type NavigationItem,
} from '@/components/shared/branded-header-menu'

const navigationItems: NavigationItem[] = [
    {
        href: 'calendar',
        title: 'Calendar View',
    },

    {
        href: 'calendar/invitation-view',
        title: 'Invitation View',
    },
]

const CalendarTab = () => {
    const [date, setDate] = useState(dayjs())
    const auth = useAtomValue(authAtom)
    const dateStart = date.startOf('day')
    const dateEnd = date.endOf('day')

    const handleNavigate = () => {
        router.push('/calender/event-details')
    }
    const handleAddEvent = () => {
        router.push('/calendar/invite-user-view')
    }
    const calendarParam = {
        connection_user_id: auth.user.userId,
        date_start: dateStart.unix(),
        date_end: dateEnd.unix(),
    }

    const { data: calendarEvents, isLoading } = useQuery({
        queryKey: ['calendarEvents', calendarParam],
        queryFn: () => getCalendarEvents(calendarParam),
    })

    return (
        <View className="flex-1">
            <LinearGradient
                colors={['#FDC830', '#F57435']}
                className="h-3/5 rounded-b-3xl justify-around"
            >
                <BrandedHeaderMenu
                    title="Calendar"
                    items={navigationItems}
                    noGradient
                />
                <View className="h-1/2 w-full flex-1 px-2.5 pt-8">
                    <DateTimePicker
                        mode="single"
                        date={date.toDate()}
                        calendarTextStyle={{ color: 'white' }}
                        headerTextStyle={{ color: 'white' }}
                        weekDaysTextStyle={{ color: 'white' }}
                        headerButtonColor="white"
                        onChange={(event) => setDate(dayjs(event.date))}
                    />
                </View>
            </LinearGradient>
            <ScrollView>
                <View className="h-full">
                    {!calendarEvents?.events ||
                        (calendarEvents.events.length === 0 && (
                            <View className="flex items-center">
                                <Text className="text-xl font-bold text-gray-600 px-5 text-center mt-20">
                                    You do not have anything scheduled on this
                                    date
                                </Text>
                                <Image source={NO_EVENTS} className="mt-5" />
                            </View>
                        ))}
                    {isLoading && <LoadingScreen />}
                    {calendarEvents?.events.map((event, index) => (
                        <TouchableOpacity
                            onPress={handleNavigate}
                            key={event.meetup.meetupId}
                            className="pt-3 px-5 "
                        >
                            <View className="bg-white rounded-2xl flex-row justify-center mb-2 h-35">
                                <LinearGradient
                                    className="bg-slate-700 rounded-2xl w-1/3 pt-3"
                                    colors={['#FDC830', '#F57435']}
                                >
                                    <Text className="text-center text-white font-bold py-1 ">
                                        {dayjs(date).format('dddd')}
                                    </Text>
                                    <Text className="text-center text-white font-bold text-3xl">
                                        {dayjs(date).format('D')}
                                    </Text>
                                    <Text className="text-center text-white font-bold py-1">
                                        {dayjs(date).format('MMMM')}
                                    </Text>
                                    <Text className="text-center text-white font-bold py-1 mt-3 border-white border-2 rounded-xl mx-5 mb-2">
                                        {event.meetup.status}
                                    </Text>
                                </LinearGradient>

                                <View className="flex-1 ml-4  items-start pt-4">
                                    <Text className="text-orange-500 font-bold text-lg">
                                        {event.userConnection.user.userName},{' '}
                                        {event.userConnection.user.age}
                                    </Text>
                                    <Text className="text-gray-500 font-semibold py-1 text-base">
                                        {event.meetup.meetupName}
                                    </Text>
                                    <Text className="text-gray-500 font-semibold py-1 text-base">
                                        {(() => {
                                            const date = new Date(
                                                event.meetup.dateStart * 1000,
                                            )
                                            return date.toLocaleString(
                                                undefined,
                                                {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    hour12: true,
                                                },
                                            )
                                        })()}
                                    </Text>
                                    <Text className=" text-gray-500 font-semibold h-7 text-base overflow-hidden whitespace-nowrap text-ellipsis">
                                        {event.meetup.eventPlace}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity
                className="absolute bottom-7 right-7 rounded-full bg-[#F57435] flex items-center justify-center"
                onPress={handleAddEvent}
            >
                <MaterialCommunityIcons name="plus" size={70} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default CalendarTab
