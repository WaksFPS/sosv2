import notifee from '@notifee/react-native'
import { useEffect } from 'react'
export const useNotifee = () => {
    const notifeeInit = async () => {
        await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        })
    }

    useEffect(() => {
        notifeeInit()
    }, [])
}
