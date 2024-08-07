import { useMediaDevice } from '@videosdk.live/react-native-sdk'
import { Permission } from '@videosdk.live/react-native-sdk/types/permission'
import { useEffect } from 'react'
import { Platform } from 'react-native'

export const useMediaPermissions = () => {
    const {
        requestBluetoothPermission,
        checkPermission,
        requestPermission,
        checkBlueToothPermission,
    } = useMediaDevice()

    const mediaCheckPermission = async () => {
        console.log('checking permission')
        const checkAudioVideoPermission = await checkPermission(
            'audio_video' as Permission.AUDIO_AND_VIDEO,
        )

        if (!checkAudioVideoPermission.get('audio')) {
            console.log('requesting permission for audio')
            await requestPermission('audio' as Permission.AUDIO)
        }

        if (!checkAudioVideoPermission.get('video')) {
            console.log('requesting permission for video')
            await requestPermission('video' as Permission.VIDEO)
        }

        if (Platform.OS === 'android') {
            const checkBTPermission = await checkBlueToothPermission()
            console.log('checking bluetooth permission', checkBTPermission)

            if (!checkBTPermission) {
                try {
                    console.log('requesting bluetooth permission')
                    await requestBluetoothPermission()
                } catch (error) {
                    console.log('error in requesting bluetooth permission')

                    console.log(error)
                }
            }
        }
    }

    useEffect(() => {
        mediaCheckPermission()
    }, [])
}
