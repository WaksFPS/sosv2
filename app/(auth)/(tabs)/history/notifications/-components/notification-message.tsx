import { Text } from 'react-native'
import { NOTIFICATION_TYPE_ENUM as NOTIF } from '@/dictionary/contants'

export const NotifMessage = ({ type }: { type: string }) => {
    if (type.includes(NOTIF.VIDEO_SEND)) {
        return <Text>sent you a video call request.</Text>
    }

    if (type.includes(NOTIF.MESSAGE_SEND)) {
        return <Text>sent you chat request.</Text>
    }

    if (type.includes(NOTIF.CALENDAR_SEND)) {
        return <Text>sent you a calendar invite.</Text>
    }

    if (type.includes(NOTIF.PHONE_SEND)) {
        return <Text>sent you a voice call request.</Text>
    }

    if (type.includes(NOTIF.CALENDAR_ACCEPT)) {
        return <Text>accepted your calendar invite.</Text>
    }

    if (type.includes(NOTIF.PHONE_ACCEPT)) {
        return <Text>accepted your voice call request.</Text>
    }

    if (type.includes(NOTIF.VIDEO_ACCEPT)) {
        return <Text>accepted your video call request.</Text>
    }

    if (type.includes(NOTIF.MESSAGE_ACCEPT)) {
        return <Text>accepted your chat request.</Text>
    }

    return <Text>hearted you.</Text>
}
