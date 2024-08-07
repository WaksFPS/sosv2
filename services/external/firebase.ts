import messaging from '@react-native-firebase/messaging'

export interface MessagingData {
    dateSent: string
    identity: string
    isNotificationShowed: string
    itemId: string
    notifType: string
    senderId: string
    twi_body: string
    twi_title: string
}

export const FCMGetDeviceToken = async () => {
    const token = await messaging().getToken()
    return token
}
