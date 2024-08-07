import { axiosInstance } from '@/services/axios'
import { GetCalendarEventsTypeResponseType, GetCalendarEventsType,CreateCalendarEventsType, GetMeetupDetailsType, GetMeetupDetailsResponseType } from './schema'

export const getCalendarEvents = async (data: GetCalendarEventsType) => {
        const response = await axiosInstance.get(
            `/calendar/events/${data.connection_user_id}`,
            {
                params: data,
            },
        )
        return response.data as GetCalendarEventsTypeResponseType
 
}
export const createCalendarEvent = async (data: CreateCalendarEventsType) => {
    try {
        const response = await axiosInstance.post('/calendar/event/add', data);
        return response.data;
    } catch (error) {
        console.error('Error creating calendar event:', error);
        throw error;
    }
};

export const getMeetupDetails = async (data: GetMeetupDetailsType) => {
    const response = await axiosInstance.get(
        `calendar/event/detail/${data.meetup_id}`,
        {
            params: data,
        },
      
    )
    return response.data as GetCalendarEventsTypeResponseType

}


