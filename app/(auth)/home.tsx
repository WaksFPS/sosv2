import { Button } from '@/components/shared/button'
import { Link } from '@/components/shared/link'
import { axiosInstance } from '@/services/axios'
import { AuthType } from '@/services/endpoints/auth/schema'
import { authAtom } from '@/store/auth'
import { mmkvClearAllKeys } from '@/store/mmkv'
import { twilioClientAtom } from '@/store/twilio'
import { userDataAtom, userTokenTwilioAtom } from '@/store/user'
import { router } from 'expo-router'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Home = () => {
    const [twilioToken, setTwilioToken] = useAtom(userTokenTwilioAtom)
    const setAuth = useSetAtom(authAtom)
    const userData = useAtomValue(userDataAtom)
    const twilioClient = useAtomValue(twilioClientAtom)

    const removeStates = async () => {
        setAuth({
            token: '',
            authenticated: false,
            user: {} as AuthType,
        })
        setTwilioToken('')
        mmkvClearAllKeys()
    }

    const removeTwClient = async () => {
        if (twilioClient) {
            try {
                twilioClient.removeAllListeners()
                await twilioClient.shutdown()
            } catch (e) {
                console.log('Error shutting down twilio client', e)
            }
        }
    }

    const logout = () => {
        removeStates()
        removeTwClient()
        axiosInstance.defaults.headers.common['Authorization'] = ''
        router.replace('/')
    }

    return (
        <SafeAreaView className="h-full space-y-3 px-4">
            <Text>You are logged in. {userData?.user?.email} </Text>
            <Text>Twilio token: {twilioToken}</Text>
            <Button onPress={logout}>Logout</Button>
            <Link
                containerClassName="px-0"
                buttonClassName="py-3"
                href="/(auth)/dashboard"
            >
                Dashboard
            </Link>
        </SafeAreaView>
    )
}

export default Home
