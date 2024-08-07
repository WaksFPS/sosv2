import { useAuthenticate } from '@/hooks/useAuthenticate'
import { useDeviceToken } from '@/hooks/useDeviceToken'
import useFCM from '@/hooks/useFCM'
import { useNotifee } from '@/hooks/useNotifee'
import { useTwilioListener } from '@/hooks/useTwilioListener'
import { twilioClientAtom } from '@/store/twilio'
import { userTokenTwilioAtom } from '@/store/user'
import { Client } from '@twilio/conversations'
import { Slot, Stack } from 'expo-router'
import Drawer from 'expo-router/drawer'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomDrawerContent from './(aux)/drawer/drawer'

export const AuthLayout = () => {
    useAuthenticate()
    useTwilioListener()
    useDeviceToken()
    useNotifee()
    useFCM()

    const setTwilioClient = useSetAtom(twilioClientAtom)
    const twilioToken = useAtomValue(userTokenTwilioAtom)

    useEffect(() => {
        if (!twilioToken) return

        const client = new Client(twilioToken)

        setTwilioClient(client)
    }, [twilioToken])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerStyle: {
                        width: '100%',
                    },
                }}
            />
        </GestureHandlerRootView>
    )
}

export default AuthLayout
