import { axiosInstance } from '@/services/axios'
import {
    StartCallVoipType,
    UpdateAllCallVoipType,
    UpdateCallVoipType,
    StartCallVoipResponse,
    VideoSDKTokenResponse,
    MeetingRoom,
} from './schema'

/**
 * this is use to start a voip call
 * depending on the platform
 * it will use the fcm token
 * or the apn token
 * to send the notification
 * the backend is set to handle both
 */
export const startVoipCallApi = async (params: StartCallVoipType) => {
    const response = await axiosInstance.post('/streaming/voip', params)

    return response.data as StartCallVoipResponse
}

/**
 * this is used to update all voip call
 * using fcm token only
 * regardless of the platform
 */
export const updateAllVoipCallApi = async (params: UpdateAllCallVoipType) => {
    const response = await axiosInstance.post(
        '/streaming/voip/update/all',
        params,
    )

    return response.data
}

/**
 * this is used to update voip call specific devices
 * using fcm token only
 * regardless of the platform
 */
export const updateVoipCallApi = async (params: UpdateCallVoipType) => {
    const response = await axiosInstance.post('/streaming/voip/update', params)

    return response.data
}

/**
 * Create a video sdk token
 */
export const createVideoSdkTokenApi = async () => {
    const response = await axiosInstance.get('/streaming/video-sdk/token')

    return response.data as VideoSDKTokenResponse
}

/**
 * Create a meeting room
 *  this is using the 'videosdk-token' as header
 *  to authenticate the request
 */
export const createMeetingRoomApi = async () => {
    const response = await axiosInstance.post('/streaming/video-sdk/meeting')

    return response.data as MeetingRoom
}
