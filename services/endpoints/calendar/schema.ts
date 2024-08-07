import { z } from 'zod'
import { statusSchema } from '../shared/schema'
import { userFieldSchema, userSchema } from '../user/schema'

export const getCalendarSchema = z.object({
    connection_user_id: z.number(),
    date_start: z.number(),
    date_end: z.number()
})

export const getMeetupDetailsSchema = z.object({
  user_id: z.number(),
  meetup_id: z.number()
})

export const createCalendarEventSchema = z.object({
  user_id: z.number(),
  connection_user_id: z.number(),
  meetup_name: z.string(),
  reminder: z.number(),
  event_place: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip_code: z.string(),
  date_start: z.number(),
  date_end: z.number(),
  
})

export type GetCalendarEventsType = z.infer<typeof getCalendarSchema>


export type GetMeetupDetailsType = z.infer<typeof getMeetupDetailsSchema>



export type CreateCalendarEventsType = z.infer<typeof createCalendarEventSchema>


const eventReceiverSchema = z.object({
    calendarId: z.number(),
    meetupId: z.number(),
    userId: z.number(),
    userInviteType: z.string(),
    status: z.string(),
    reminder: z.number(),
    isSeen: z.number(),
    whenAdded: z.number(),
    whenUpdated: z.number(),
    whoAdded: z.number(),
    whoUpdated: z.number(),
})

const eventSenderSchema = z.object({
    calendarId: z.number(),
    meetupId: z.number(),
    userId: z.number(),
    userInviteType: z.string(),
    status: z.string(),
    reminder: z.number(),
    isSeen: z.number(),
    whenAdded: z.number(),
    whenUpdated: z.number(),
    whoAdded: z.number(),
    whoUpdated: z.number(),
})

const meetupSchema = z.object({
    meetupId: z.number(),
    meetupName: z.string(),
    details: z.string(),
    eventPlace: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    dateStart: z.number(),
    dateEnd: z.number(),
    status: z.string(),
    whenAdded: z.number(),
    whenUpdated: z.number(),
    whoAdded: z.number(),
    whoUpdated: z.number(),
})

export const userConnectionSchema = z.object({
    user: userSchema,
      userField: z.object({
        about: z.string(),
        address: z.object({
          zipCode: z.string(),
          city: z.string(),
          state: z.string(),
          country: z.string()
        }),
        position: z.object({
          isLocationOn: z.number(),
          lastPosLat: z.number(),
          lastPosLng: z.number()
        }),
        
      }),
    connectionId: z.number(),
      cUserId: z.number(),
      connectionUserId: z.number(),
      status: z.string(),
      isReachabilityStatusOn: z.number(),
        heart: z.null(),
      phoneCall: z.string(),
      videoCall: z.string(),
      message: z.string(),
      rating: z.number(),
      note: z.null(),
      shortList: z.string(),
      whoAdded: z.number(),
      whenAdded: z.number(),
      whoUpdated: z.number(),
      whenUpdated: z.number(),
})



export const eventsSchema = z.object({
    eventReceiver: eventReceiverSchema,
    eventSender: eventSenderSchema,
    meetup: meetupSchema,
    userConnection: userConnectionSchema,
    })


export const profileViewSchema= z.object({
    profileViewId: z.number(),
    userId: z.number(),
    viewerUserId: z.number(),
    status: z.string(),
    whenViewed: z.number(),
    isSeen: z.boolean(),
    whoAdded: z.number(),
    whenAdded: z.number(),
    whoUpdated: z.number(),
    whenUpdated: z.number()
  })


  export type EventsType = z.infer<typeof eventsSchema>


export const getCalendarEventsResponseSchema = z.object({
    status: statusSchema,
    events: z.array(eventsSchema),
})

export const getMeetupDetailsResponseSchema = z.object({
  status: statusSchema,
  event: z.array(eventsSchema),

})

export type GetCalendarEventsTypeResponseType = z.infer<typeof getCalendarEventsResponseSchema>
export type GetMeetupDetailsResponseType = z.infer<typeof getMeetupDetailsResponseSchema>
