import React from 'react'
import { View, Text, Alert } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { getUserDataApi } from '@/services/endpoints/user'
import { BrandedHeaderConnectUser } from '@/components/shared/branded-header-connect-user'

const EventDetails = () => {
    const params = useLocalSearchParams()
    const { connectionUserId } = params

    const getUserParam = {
        user_id: Number(connectionUserId),
    }
    const connectionData = useQuery({
        queryKey: ['connectionData', getUserParam],
        queryFn: () => getUserDataApi(Number(connectionUserId)),
    })

    if (connectionData.isLoading) {
        return <Text>Loading...</Text>
    }

    if (!connectionData.data) {
        Alert.alert('Error', 'User not found', [
            { text: 'Ok', onPress: () => router.back() },
        ])
        return null
    }

    return (
        <>
            <BrandedHeaderConnectUser
                title="Event Details"
                connectedUser={connectionData.data.userDetail.user}
            />
            <View className="h-full">
                <View className="flex-row justify-start gap-5 pt-1 my-1">
                    <View className="flex-col gap-5">
                        <Text className="font-bold text-base text-gray-500">
                            DATE/TIME:
                        </Text>
                        <Text className="font-bold text-base text-gray-500">
                            EVENT:
                        </Text>
                        <Text className="font-bold text-base text-gray-500">
                            LOCATION:
                        </Text>
                        <Text className="font-bold text-base text-gray-500">
                            REMINDER:
                        </Text>
                    </View>
                    <View className="flex-col gap-5">
                        <Text className="font-bold text-base text-gray-500">
                            Friday March 15, 2024 12:00PM
                        </Text>
                        <Text className="font-bold text-base text-gray-500">
                            testinv
                        </Text>
                        <Text className="font-bold text-base text-gray-500">
                            test
                        </Text>
                        <Text className="font-bold text-base text-gray-500">
                            No Reminder
                        </Text>
                    </View>
                </View>
            </View>
        </>
    )
}

export default EventDetails
