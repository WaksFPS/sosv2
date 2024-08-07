import { axiosInstance } from '@/services/axios'
import {
    createMeetingRoomApi,
    createVideoSdkTokenApi,
} from '@/services/endpoints/streaming'
import { MeetingRoom } from '@/services/endpoints/streaming/schema'
import { authAtom } from '@/store/auth'
import { queryClient } from '@/store/query-client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export const useVideoSdk = () => {
    const [auth, setAuth] = useAtom(authAtom)
    const [refresh, setRefresh] = useState(false)
    const [room, setRoom] = useState<MeetingRoom | null>(null)

    const videoSdkQuery = useQuery(
        {
            queryKey: ['videoSdk', auth.user.userId],
            queryFn: () => createVideoSdkTokenApi(),
            enabled: false,
        },
        queryClient,
    )

    const createMeetingRoomMu = useMutation(
        {
            mutationFn: () => createMeetingRoomApi(),
            onSuccess: (data) => {
                setRoom(data)
            },
            onError: (error) => {
                console.log('createMeetingRoomMu error:', error)
                videoSdkQuery.refetch()
            },
        },
        queryClient,
    )

    const refreshToken = () => {
        setRefresh(true)
    }

    const createMeetingRoom = async () => {
        createMeetingRoomMu.mutate()

        return room
    }

    useEffect(() => {
        if (refresh) {
            videoSdkQuery.refetch()
            setRefresh(false)
        }
    }, [refresh])

    useEffect(() => {
        if (!videoSdkQuery.data) return

        axiosInstance.defaults.headers.common['videosdk-token'] =
            videoSdkQuery.data.token

        setAuth((prev) => ({
            ...prev,
            meetingToken: videoSdkQuery.data.token,
        }))
    }, [videoSdkQuery.data])

    return { refreshToken, room, createMeetingRoom }
}
