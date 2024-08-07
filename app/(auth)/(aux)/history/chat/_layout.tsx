import { LinearGradient } from 'expo-linear-gradient'
import { Slot, useRouter } from 'expo-router'
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import Avatar from '@/components/shared/avatar'
import { selectedUserAtom } from '@/store/twilio'
import { useAtomValue, useSetAtom } from 'jotai'
import { useMutation } from '@tanstack/react-query'
import { authAtom } from '@/store/auth'
import { StartCallVoipType } from '@/services/endpoints/streaming/schema'
import { startVoipCallApi } from '@/services/endpoints/streaming'
import { startedCallingAtom } from '@/store/call'
import { useVideoSdk } from '@/hooks/useVideoSdk'

const ChatMessageLayout = () => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            contentContainerStyle={{ flex: 1 }}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <HeaderComponent />
                    <Slot />
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

function HeaderComponent() {
    const selectedUser = useAtomValue(selectedUserAtom)
    const videoSdk = useVideoSdk()
    const auth = useAtomValue(authAtom)
    const setCallVoip = useSetAtom(startedCallingAtom)
    const router = useRouter()

    const sendVoipNotif = useMutation({
        mutationFn: (data: StartCallVoipType) => startVoipCallApi(data),
        onSuccess: (data) => {
            setCallVoip(data)
        },
        onError: (error) => {
            console.log('cant start call ', error)
            Alert.alert('Error', 'Error sending call')
        },
    })

    const handleBack = () => {
        router.replace('/(tabs)/history/chat')
    }

    const handleCall = async () => {
        const room = await videoSdk.createMeetingRoom()

        if (!room || !auth.meetingToken) return

        router.navigate(
            `/(aux)/caller-ui/outgoing?token=${auth.meetingToken}&meetingId=${room.roomId}&videoEnabled=${false}&name=${selectedUser?.user.userName}`,
        )

        sendVoipNotif.mutate({
            receiverID: selectedUser!.user.userId,
            isVideoCall: false,
            isProduction: false,
            token: auth.meetingToken,
            meetingID: room?.roomId,
        })
    }

    const handleVideoCall = async () => {
        const room = await videoSdk.createMeetingRoom()

        if (!room || !auth.meetingToken) return

        router.navigate(
            `/(aux)/caller-ui/outgoing?token=${auth.meetingToken}&meetingId=${room.roomId}&videoEnabled=${true}&name=${selectedUser?.user.userName}`,
        )

        sendVoipNotif.mutate({
            receiverID: selectedUser!.user.userId,
            isVideoCall: true,
            isProduction: false,
            token: auth.meetingToken,
            meetingID: room?.roomId,
        })
    }

    return (
        <LinearGradient colors={['#FDC830', '#F57435']} className="h-28 pb-0">
            <SafeAreaView className="flex-row justify-between px-4">
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={handleBack}>
                        <AntDesign name="arrowleft" size={24} color="white" />
                    </TouchableOpacity>
                    <View>
                        <Avatar
                            uri={selectedUser?.user.mediaProfileReso?._100}
                        />
                    </View>
                    <View>
                        <Text className="text-white text-lg font-bold">
                            {selectedUser?.user.userName}
                        </Text>
                        <Text className="text-white text-xs">
                            {selectedUser?.user.email}
                        </Text>
                    </View>
                </View>
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={handleCall}>
                        <Ionicons name="call" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleVideoCall}>
                        <Ionicons name="videocam" size={30} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default ChatMessageLayout
