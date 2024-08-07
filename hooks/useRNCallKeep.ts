import { Platform } from 'react-native'
import RNCallKeep, { HandleType } from 'react-native-callkeep'

export interface ConfigureRNCallKeepHook {
    incomingCallAnswer: () => void
    incomingCallEnd: () => void
}

export interface StartCallType {
    uuid: string
    handle: string
    contactIdentifier?: string
    handleType?: HandleType
    hasVideo?: boolean
}

export interface ReportEndCallWithUUIDType {
    uuid: string
    reason: number
}

export interface DisplayIncomingCallType {
    callerUUID: string
    callerName: string
    hasVideo: boolean
}

const useRNCallKeep = () => {
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
                    channelId: 'com.sosearch',
                    channelName: 'Foreground service for SOSearch',
                    notificationTitle: 'SOSearch is running on background',
                },
            },
        })
    }

    const startCall = (props: StartCallType) => {
        RNCallKeep.startCall(
            props.uuid,
            props.handle,
            props.contactIdentifier,
            props.handleType,
            props.hasVideo,
        )
    }

    const reportEndCallWithUUID = (props: ReportEndCallWithUUIDType) => {
        RNCallKeep.reportEndCallWithUUID(props.uuid, props.reason)
    }

    const endIncomingCallAnswer = (uuid: string) => {
        RNCallKeep.endCall(uuid)
        removeEvents()
    }

    const removeEvents = () => {
        RNCallKeep.removeEventListener('answerCall')
        RNCallKeep.removeEventListener('endCall')
    }

    const displayIncomingCall = (props: DisplayIncomingCallType) => {
        Platform.OS === 'android' && RNCallKeep.setAvailable(false)
        RNCallKeep.displayIncomingCall(
            props.callerUUID,
            props.callerName,
            props.callerName,
            'number',
            props.hasVideo,
            undefined,
        )
    }

    const backToForeground = () => {
        RNCallKeep.backToForeground()
    }

    const endAllCalls = () => {
        RNCallKeep.endAllCalls()
        removeEvents()
    }

    const rejectCall = (uuid: string) => {
        RNCallKeep.rejectCall(uuid)
        removeEvents()
    }

    return {
        configure,
        startCall,
        reportEndCallWithUUID,
        displayIncomingCall,
        endIncomingCallAnswer,
        backToForeground,
        endAllCalls,
        rejectCall,
    }
}

export default useRNCallKeep
