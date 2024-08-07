import React, { useState } from 'react'
import { Text, View, TouchableOpacity, Alert } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getShortlist, getWhoIViewed } from '@/services/endpoints/connection'
import { useAtomValue } from 'jotai'
import { authAtom } from '@/store/auth'
import { router } from 'expo-router'
import { LoadingScreen } from '../-components/loading-component'
import Avatar from '@/components/shared/avatar'
import { BrandedHeaderSearchBar } from '@/components/shared/branded-header-search-bar'

const InviteUserView = () => {
    const auth = useAtomValue(authAtom)
    const [searchQuery, setSearchQuery] = useState('')

    const shortlistParam = {
        user_id: auth.user.userId,
    }
    const { data: shortlist, isLoading } = useQuery({
        queryKey: ['shortlist', shortlistParam],
        queryFn: () => getShortlist(shortlistParam),
    })

    const whoIViewedParam = {
        user_id: auth.user.userId,
        page: 1,
    }
    const { data: whoIViewed } = useQuery({
        queryKey: ['whoIViewed', whoIViewedParam],
        queryFn: () => getWhoIViewed(whoIViewedParam),
    })

    const handleNavigate = (
        userId: number,
        message: string,
        status: string,
        username: string,
    ) => {
        if (message === 'ACT' && status !== 'RBL') {
            router.push({
                pathname: '/calendar/send-invitation',
                params: {
                    connectionUserId: userId,
                },
            })
        } else if (status === 'RBL') {
            Alert.alert('Send Invite', `Sorry, ${username} blocked you.`, [
                { text: 'Ok' },
            ])
        } else {
            Alert.alert(
                'Calendar',
                `To enable calendar invite, You and ${username} must be connected.`,
                [
                    { text: 'Cancel' },
                    {
                        text: 'View Profile',
                    },
                ],
            )
        }
    }

    const displayedUsers = []
    const uniqueUserIds = new Set()

    if (whoIViewed && whoIViewed.userConnection.length > 0) {
        for (const index of whoIViewed.userConnection) {
            if (displayedUsers.length >= 6) break
            if (!uniqueUserIds.has(index.user.userId)) {
                uniqueUserIds.add(index.user.userId)
                displayedUsers.push(index)
            }
        }
    }

    const filteredShortlist = shortlist
        ? shortlist.userConnection.filter((user) =>
              user.user.userName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
          )
        : []

    const filteredRecentlyViewed = displayedUsers.filter((user) =>
        user.user.userName.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <>
            <BrandedHeaderSearchBar
                title="Search"
                onChangeSearch={setSearchQuery}
            />
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <View className="flex flex-col flex-grow p-5">
                    <Text className="text-base font-base mb-3 text-gray-500">
                        Shortlist ({filteredShortlist.length})
                    </Text>
                    <View className="flex flex-row flex-wrap">
                        {filteredShortlist.length > 0 ? (
                            filteredShortlist.map((index) => (
                                <TouchableOpacity
                                    key={index.user.userId}
                                    className="w-1/3 flex items-center mb-5"
                                    onPress={() =>
                                        handleNavigate(
                                            index.user.userId,
                                            index.message,
                                            index.status,
                                            index.user.userName,
                                        )
                                    }
                                >
                                    <Avatar
                                        imageClassName="w-16 h-16 rounded-full"
                                        uri={index.user.mediaProfile}
                                    />
                                    <Text className="text-center mt-2 text-gray-500">
                                        {index.user.userName}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text>No users in shortlist</Text>
                        )}
                    </View>
                    <Text className="text-base font-base mb-3 text-gray-500">
                        Recently Viewed ({filteredRecentlyViewed.length})
                    </Text>
                    <View className="flex flex-row flex-wrap">
                        {filteredRecentlyViewed.length > 0 ? (
                            filteredRecentlyViewed.map((index) => (
                                <TouchableOpacity
                                    key={index.user.userId}
                                    className="w-1/3 flex items-center mb-5"
                                    onPress={() =>
                                        handleNavigate(
                                            index.user.userId,
                                            index.message,
                                            index.status,
                                            index.user.userName,
                                        )
                                    }
                                >
                                    <Avatar
                                        imageClassName="w-16 h-16 rounded-full"
                                        uri={index.user.mediaProfile}
                                    />
                                    <Text className="text-center mt-2 text-gray-500">
                                        {index.user.userName}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <Text>No users in recently viewed</Text>
                        )}
                    </View>
                </View>
            )}
        </>
    )
}

export default InviteUserView
