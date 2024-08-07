import { Ionicons } from '@expo/vector-icons'

export const NotifIcons = ({ type }: { type: string }) => {
    if (type.includes('VID_')) {
        return <Ionicons name="videocam" size={16} color="#6b7280" />
    }

    if (type.includes('MES_')) {
        return <Ionicons name="chatbubble" size={16} color="#6b7280" />
    }

    if (type.includes('CAL_')) {
        return <Ionicons name="calendar" size={16} color="#6b7280" />
    }

    if (type.includes('PHO_')) {
        return <Ionicons name="call" size={16} color="#6b7280" />
    }

    return <Ionicons name="heart" size={16} color="#6b7280" />
}
