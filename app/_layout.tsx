import '@react-native-firebase/app'
import 'expo-dev-client'
import { queryClient } from '@/store/query-client'
import { Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { focusManager } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { AppStateStatus, Platform } from 'react-native'
import { useOnlineManager } from '@/hooks/useOnlineManager'
import { useAppState } from '@/hooks/useAppState'
import { clientStorage } from '@/store/mmkv'
import { register } from '@videosdk.live/react-native-sdk'
import messaging, {
    FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import RNCallKeep from 'react-native-callkeep'
import { ConfigureRNCallKeepHook } from '@/hooks/useRNCallKeep'
import { VoipNotificationType } from '@/services/endpoints/shared/schema'
import * as Linking from 'expo-linking'

import { RootSiblingParent } from 'react-native-root-siblings'
import { useFonts } from 'expo-font'

// persistent storage
const persisterClient = createSyncStoragePersister({
    storage: clientStorage,
})

register()

const configure = (props: ConfigureRNCallKeepHook) => {
    setupCallKeep()
    Platform.OS === 'android' && RNCallKeep.setAvailable(true)
    RNCallKeep.addEventListener('answerCall', props.incomingCallAnswer)
    RNCallKeep.addEventListener('endCall', props.incomingCallEnd)
}

const setupCallKeep = () => {
    RNCallKeep.setup({
        ios: {
            appName: 'SOSearch',
            supportsVideo: true,
        },
        android: {
            alertTitle: 'Permissions required',
            alertDescription:
                'This application needs to access your phone accounts',
            cancelButton: 'Cancel',
            okButton: 'ok',
            imageName: 'phone_account_icon',
            additionalPermissions: [],
            foregroundService: {
                channelId: 'com.company',
                channelName: 'Foreground service for SOSearch',
                notificationTitle: 'SOSearch is running on background',
            },
        },
    })
}

const incomingCallAnswer = (notifs: VoipNotificationType) => {
    RNCallKeep.endCall(notifs.uuid)
    RNCallKeep.removeEventListener('answerCall')
    RNCallKeep.removeEventListener('endCall')

    // should update call thread and call status
    // redirect to call screen
    const redirectUrl = Linking.createURL('caller-ui/incoming', {
        queryParams: {
            token: notifs.token,
            meetingId: notifs.meeting_id,
            videoEnabled: notifs.type === 'VID_DIA' ? 'true' : 'false',
            name: notifs.callerName,
        },
    })

    Linking.openURL(redirectUrl)
}

const endIncomingCall = (notifs: VoipNotificationType) => {
    // should update call thread and call status
    RNCallKeep.endCall(notifs.uuid)
    RNCallKeep.removeEventListener('answerCall')
    RNCallKeep.removeEventListener('endCall')
}

// handle app state change
const onAppStateChange = (status: AppStateStatus) => {
    console.log('App state changed', status)
    // React Query already supports in web browser refetch on window focus by default
    if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active')
    }
}

const firebaseListener = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
    console.log('Received in background', remoteMessage)
    const data = remoteMessage.data as unknown as VoipNotificationType

    switch (data.type) {
        case 'AUD_DIA':
        case 'VID_DIA':
            configure({
                incomingCallAnswer: () => incomingCallAnswer(data),
                incomingCallEnd: () => endIncomingCall(data),
            })

            Platform.OS === 'android' && RNCallKeep.setAvailable(true)
            RNCallKeep.backToForeground()
            RNCallKeep.displayIncomingCall(
                data.uuid,
                data.callerName,
                data.callerName,
                'generic',
                data.type === 'VID_DIA',
            )
            break
        case 'AUD_END':
        case 'VID_END':
            RNCallKeep.endCall(data.uuid)
            break
        default:
            console.log('Did not handle notification type: ', data.type)
            break
    }
}

messaging().setBackgroundMessageHandler(firebaseListener)

const RootLayout = () => {
    useOnlineManager()
    useAppState(onAppStateChange)

    //to load the custom diamond icon
    const [fontsLoaded] = useFonts({
        IcoMoon: require('@/assets/diamond.ttf'),
    })

    if (!fontsLoaded) {
        return null
    }
    return (
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: persisterClient }}
        >
            <SafeAreaProvider>
                <RootSiblingParent>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="index" />
                    </Stack>
                </RootSiblingParent>
            </SafeAreaProvider>
        </PersistQueryClientProvider>
    )
}

export default RootLayout
