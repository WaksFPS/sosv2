import { axiosInstance } from '@/services/axios'
import { createVideoSdkTokenApi } from '@/services/endpoints/streaming'
import { initUserDetailsApi } from '@/services/endpoints/user'
import { authAtom } from '@/store/auth'
import { queryClient } from '@/store/query-client'
import {
    subscriptionStatusAtom,
    userDataAtom,
    userTokenTwilioAtom,
} from '@/store/user'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'

export const useAuthenticate = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const setTwilioToken = useSetAtom(userTokenTwilioAtom)
    const setUserData = useSetAtom(userDataAtom)
    const setIsSubscribed = useSetAtom(subscriptionStatusAtom)

    const [auth, setAuth] = useAtom(authAtom)

    //06-27-2024: Commenting the subscription checker as per Sir Exo's instruction
    // const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
    // const isToday = require('dayjs/plugin/isToday')
    // const dayjs = require('dayjs')
    // dayjs.extend(isSameOrAfter)
    // dayjs.extend(isToday)

    const userQuery = useQuery(
        {
            queryKey: ['authData', auth.user.userId],
            queryFn: () =>
                initUserDetailsApi({
                    userId: auth.user.userId,
                    channelType: 'fcm',
                }),
            enabled: false,
        },
        queryClient,
    )

    const videoSdkQuery = useQuery(
        {
            queryKey: ['videoSdk', auth.user.userId],
            queryFn: () => createVideoSdkTokenApi(),
            enabled: false,
        },
        queryClient,
    )

    useEffect(() => {
        if (!auth.authenticated) {
            setIsAuthenticated(false)
        } else {
            axiosInstance.defaults.headers.common['Authorization'] =
                `Bearer ${auth.token}`

            userQuery.refetch()
            videoSdkQuery.refetch()
            setIsAuthenticated(true)
        }
    }, [auth.authenticated, auth.token, auth.user.userId])

    useEffect(() => {
        if (!userQuery.data) return

        //06-27-2024: Commenting the subscription checker as per Sir Exo's instruction
        // setIsSubscribed(
        //     dayjs(dayjs().isToday()).isSameOrAfter(
        //         dayjs().unix(
        //             userQuery.data.userDetail.userSubscription
        //                 .subscriptionPlanEnd,
        //         ),
        //     ),
        // )
        setUserData(userQuery.data.userDetail)
        setTwilioToken(userQuery.data.tokenTwilio.token)
    }, [userQuery.data])

    useEffect(() => {
        if (!videoSdkQuery.data) return

        axiosInstance.defaults.headers.common['videosdk-token'] =
            videoSdkQuery.data.token

        setAuth((prev) => ({
            ...prev,
            meetingToken: videoSdkQuery.data.token,
        }))
    }, [videoSdkQuery.data])

    return { isAuthenticated }
}
