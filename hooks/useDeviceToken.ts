import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { authAtom } from '@/store/auth'
import { saveDeviceTokenApi } from '@/services/endpoints/user'
import { SaveDeviceTokenType } from '@/services/endpoints/user/schema'
import messaging from '@react-native-firebase/messaging'
import { queryClient } from '@/store/query-client'
import { Platform } from 'react-native'
import * as Linking from 'expo-linking'
import VoipPushNotification from 'react-native-voip-push-notification'
import { VoipNotificationType } from '@/services/endpoints/shared/schema'
import RNCallKeep from 'react-native-callkeep'
import useRNCallKeep from './useRNCallKeep'

export const useDeviceToken = () => {
    const RNFunc = useRNCallKeep()
    const auth = useAtomValue(authAtom)

    const saveTokenMu = useMutation(
        {
            mutationFn: (data: SaveDeviceTokenType) => saveDeviceTokenApi(data),
        },
        queryClient,
    )

    const saveDeviceToken = async (iosDeviceToken: string) => {
        const enabled = await messaging().requestPermission()

        if (enabled) {
            const token = await messaging().getToken()
            saveTokenMu.mutate({
                fcmToken: token,
                deviceToken: iosDeviceToken,
                platform: Platform.OS,
            })
        }
    }

    const incomingCallAnswer = (notifs: VoipNotificationType) => {
        console.log(' I have answered the call')

        const redirectUrl = Linking.createURL('caller-ui/incoming', {
            queryParams: {
                token: notifs.token,
                meetingId: notifs.meeting_id,
                videoEnabled: notifs.type === 'VID_DIA' ? 'true' : 'false',
                name: notifs.callerName,
            },
        })

        Linking.openURL(redirectUrl)

        RNFunc.endIncomingCallAnswer(notifs.uuid)
    }

    const endIncomingCall = (notifs: VoipNotificationType) => {
        // should update call thread and call status
        RNFunc.endIncomingCallAnswer(notifs.uuid)
    }

    useEffect(() => {
        if (auth.authenticated) {
            messaging().onTokenRefresh((token) => {
                console.log('FCM token refreshed:', token)
                saveTokenMu.mutate({
                    fcmToken: token,
                    platform: Platform.OS,
                })
            })

            // setting device token for voip push notification
            if (Platform.OS === 'ios') {
                VoipPushNotification.addEventListener('register', (token) => {
                    if (token) {
                        saveDeviceToken(token)
                    }
                })

                RNCallKeep.addEventListener('didChangeAudioRoute', (data) => {
                    console.log('test')
                    console.log('didChangeAudioRoute', data)
                })

                VoipPushNotification.addEventListener(
                    'notification',
                    (notification) => {
                        const notifs = notification as VoipNotificationType
                        console.log(
                            'VoipPushNotification notification:',
                            notification,
                        )

                        // switch case for type of notification
                        // should handle if missed call
                        // should handle if disconnected call from other line
                        switch (notifs.notif_type) {
                            case 'AUD_DIA':
                            case 'VID_DIA':
                                console.log('displayIncomingCall')

                                RNFunc.configure({
                                    incomingCallAnswer: () =>
                                        incomingCallAnswer(notifs),
                                    incomingCallEnd: () =>
                                        endIncomingCall(notifs),
                                })

                                break
                            case 'AUD_ANS':
                            case 'VID_ANS':
                                RNFunc.endIncomingCallAnswer(notifs.uuid)
                                break
                            case 'AUD_REJ':
                            case 'VID_REJ':
                            case 'AUD_END':
                            case 'VID_END':
                                RNFunc.endIncomingCallAnswer(notifs.uuid)
                                break
                            default:
                                break
                        }
                        VoipPushNotification.onVoipNotificationCompleted(
                            notifs.uuid,
                        )
                    },
                )

                VoipPushNotification.addEventListener(
                    'didLoadWithEvents',
                    (events) => {
                        console.log('didLoadWithEvents', events)
                    },
                )

                VoipPushNotification.registerVoipToken()
            } else {
                saveDeviceToken('')
            }
        }

        return () => {
            if (Platform.OS === 'ios') {
                VoipPushNotification.removeEventListener('register')
                VoipPushNotification.removeEventListener('notification')
                VoipPushNotification.removeEventListener('didLoadWithEvents')
                RNCallKeep.removeEventListener('didChangeAudioRoute')
            }
        }
    }, [auth])
}
