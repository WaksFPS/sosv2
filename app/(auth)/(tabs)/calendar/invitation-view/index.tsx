import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { Link, router } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useAtomValue } from 'jotai'
import { authAtom } from '@/store/auth'
import { getCalendarEvents } from '@/services/endpoints/calendar'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { LoadingScreen } from '../-components/loading-component'
import { cn } from '@/lib/util'
import { BrandedHeaderMenu } from '@/components/shared/branded-header-menu'

const navigationItems = [
    {
        href: 'calendar',
        title: 'Calendar View',
    },

    {
        href: 'calendar/invitation-view',
        title: 'Invitation View',
    },
]

const InvitationView = () => {
    const auth = useAtomValue(authAtom)

    //0 date start and date end means all events will return
    const calendarParam = {
        connection_user_id: auth.user.userId,
        date_start: 0,
        date_end: 0,
    }

    const { data: calendarEvents, isLoading } = useQuery({
        queryKey: ['calendarEventsAll', calendarParam],
        queryFn: () => getCalendarEvents(calendarParam),
    })

    const handleAddEvent = () => {
        router.push('calendar/invite-user-view')
    }

    const handleNavigate = (connectionUserId: number) => {
        router.push({
            pathname: 'calendar/event-details',
            params: {
                connectionUserId,
            },
        })
    }
    return (
        <View className=" flex-1">
            <BrandedHeaderMenu title="Invitation" items={navigationItems} />
            <ScrollView className="h-full pb-14">
                <View className="flex-row justify-between pt-1 mx-6">
                    <Text className="font-bold text-base text-gray-500">
                        2024
                    </Text>
                    <Text className="font-bold text-base text-orange-400">
                        Sort
                    </Text>
                </View>
                {isLoading && <LoadingScreen />}
                {calendarEvents?.events.map((event, index) => (
                    <TouchableOpacity
                        className=""
                        key={event.meetup.meetupId}
                        onPress={() =>
                            handleNavigate(event.userConnection.user.userId)
                        }
                    >
                        <View className="pt-3 px-5 ">
                            <View className="bg-white rounded-2xl flex-row justify-center mb-2 h-40">
                                <LinearGradient
                                    className="bg-slate-700 rounded-2xl w-1/3 pt-3"
                                    colors={['#FDC830', '#F57435']}
                                >
                                    <Text className="text-center text-white font-bold py-1 ">
                                        {dayjs(
                                            event.meetup.dateStart * 1000,
                                        ).format('dddd')}
                                    </Text>
                                    <Text className="text-center text-white font-bold text-3xl">
                                        {dayjs(
                                            event.meetup.dateStart * 1000,
                                        ).format('D')}
                                    </Text>
                                    <Text className="text-center text-white font-bold py-1">
                                        {dayjs(
                                            event.meetup.dateStart * 1000,
                                        ).format('MMMM')}
                                    </Text>
                                    <Text className="text-center text-white font-bold py-1 mt-3 border-white border-2 rounded-xl mx-5">
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
                                            //use device default timezone
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
                        </View>
                    </TouchableOpacity>
                ))}
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

export default InvitationView
