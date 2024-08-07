import Avatar from '@/components/shared/avatar'
import { Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useAtomValue } from 'jotai'
import { useMutation } from '@tanstack/react-query'
import { updateAllVoipCallApi } from '@/services/endpoints/streaming'
import { UpdateAllCallVoipType } from '@/services/endpoints/streaming/schema'
import { useRouter } from 'expo-router'
import { selectedUserAtom } from '@/store/twilio'
import { startedCallingAtom } from '@/store/call'
import {
    ReactNativeForegroundService,
    useMeeting,
} from '@videosdk.live/react-native-sdk'
import { useEffect, useState } from 'react'
import { OneToOne } from '../-components/OneToOne'

const MeetingRoom = () => {
    const colors = ['#FDC830', '#F57435']
    const router = useRouter()
    const selectedUser = useAtomValue(selectedUserAtom)
    const callVoip = useAtomValue(startedCallingAtom)
    const [isJoined, setJoined] = useState(false)

    const { join, participants, leave } = useMeeting({
        onMeetingJoined: () => {
            setTimeout(() => {
                setJoined(true)
            }, 500)
        },
    })

    useEffect(() => {
        setTimeout(() => {
            if (!isJoined) {
                join()
            }
        }, 1000)

        return () => {
            leave()
            ReactNativeForegroundService.stopAll()
        }
    }, [])

    const updateVoipCallMu = useMutation({
        mutationFn: (data: UpdateAllCallVoipType) => updateAllVoipCallApi(data),
        onError: (error) => {
            console.log('Error updating voip call', error)
        },
    })

    const handleHangup = () => {
        console.log('Hangup')
        updateVoipCallMu.mutate({
            receiverID: selectedUser!.user.userId,
            type: 'AUD_END',
            callerUUID: callVoip!.uuid,
        })

        router.dismiss()
    }

    const participantIds = [...participants.keys()]

    const participantCount = participantIds ? participantIds.length : null

    return isJoined && participantCount && participantCount > 1 ? (
        <OneToOne />
    ) : (
        <LinearGradient
            colors={colors}
            className="items-center justify-center h-full"
        >
            <View className="items-center gap-y-4">
                <Avatar
                    uri={selectedUser?.user.mediaProfileReso?._500 || ''}
                    imageClassName="h-48 w-48"
                />
                <Text className="text-2xl capitalize">
                    {selectedUser?.user.userName || 'Unknown'}
                </Text>
                <Text className="text-lg">Calling...</Text>
            </View>
            <View className="flex-row absolute bottom-16">
                <TouchableOpacity
                    onPress={handleHangup}
                    className="bg-red-600 h-20 w-20 rounded-full items-center justify-center"
                >
                    <MaterialCommunityIcons
                        name="phone-hangup"
                        size={28}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default MeetingRoom
