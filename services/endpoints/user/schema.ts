import { z } from 'zod'
import {
    addressPositionSchema,
    addressSchema,
    hometownSchema,
    mediaProfileResoSchema,
    positionSchema,
    statusSchema,
} from '../shared/schema'

export const userSchema = z.object({
    userId: z.number(),
    userName: z.string(),
    email: z.string(),
    status: z.string(),
    password: z.string(),
    passwordSalt: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string(),
    birthday: z.string(),
    age: z.number(),
    phoneNo: z.string(),
    mediaProfile: z.string(),
    mediaProfileReso: mediaProfileResoSchema.optional(),
    mediaCover: z.string().nullish(),
    lastLogin: z.number(),
    lastActivity: z.number(),
    whoAdded: z.number(),
    whenAdded: z.number(),
    whoUpdated: z.number(),
    whenUpdated: z.number(),
})

export type UserType = z.infer<typeof userSchema>

export const userForgotPasswordSchema = z.object({
    user: userSchema,
})
export type UserForgotPasswordType = z.infer<typeof userForgotPasswordSchema>

export const userPreferencesSchema = z.object({
    hairColor: z.string(),
    eyeColor: z.string(),
    relationshipType: z.string(),
    relationshipStatus: z.string(),
    relationshipStatusDesc: z.string(),
    lookingForGender: z.string(),
    religBelief: z.string(),
    religBeliefDesc: z.string().optional(),
    languageCode: z.array(z.string()),
    height: z.string(),
    bodyType: z.string(),
    kidSituation: z.string(),
    educLevel: z.string(),
    prefAlcohol: z.string(),
    prefSmoking: z.string(),
    ethnicity: z.string(),
    profession: z.string(),
    petPolicy: z.string(),
    posPolitics: z.string(),
    exerRegimen: z.string(),
    incomeLevel: z.string().nullish(),
    hobbyCode: z.array(z.string()),
})

export type UserPreferencesType = z.infer<typeof userPreferencesSchema>

export const userCreditCardSchema = z.object({
    userCreditCardId: z.number(),
    userId: z.number(),
    cardNumber: z.string().nullish(),
    expiration: z.string().nullish(),
    ccv: z.string().nullish(),
    nameOnCard: z.string().nullish(),
    status: z.string().nullish(),
    whoAdded: z.number(),
    whenAdded: z.number(),
    whoUpdated: z.number(),
    whenUpdated: z.number(),
})

export type UserCreditCardType = z.infer<typeof userCreditCardSchema>

export const userFieldSchema = z.object({
    about: z.string(),
    referredBy: z.string(),
    address: addressSchema,
    position: positionSchema,
    addressPosition: addressPositionSchema,
    hometown: hometownSchema,
    userPreference: userPreferencesSchema,
    whoAdded: z.number(),
    whenAdded: z.number(),
    whoUpdated: z.number(),
    whenUpdated: z.number(),
})

export type UserFieldType = z.infer<typeof userFieldSchema>

export const userSubscriptionSchema = z.object({
    userSubscriptionPlanId: z.number(),
    userId: z.number(),
    subscriptionPlanId: z.number(),
    stripeSubscriptionPlanId: z.string(),
    stripeCustomerId: z.string(),
    membershipLevelCode: z.string(),
    subscriptionPlanStart: z.number(),
    subscriptionPlanEnd: z.number(),
    status: z.string(),
    viewabilityStatus: z.string(),
    whoAdded: z.number(),
    whenAdded: z.number(),
    whoUpdated: z.number(),
    whenUpdated: z.number(),
})

export type UserSubscriptionType = z.infer<typeof userSubscriptionSchema>

export const userSettingSchema = z.object({
    isGeneralSoundOn: z.number(),
    isGeneralAlertOn: z.number(),
    isReachabilityStatusOn: z.number(),
    isChatAlertOn: z.number(),
    isChatSoundOn: z.number(),
    isVoiceCallAlertOn: z.number(),
    isVoiceCallSoundOn: z.number(),
    isVideoCallAlertOn: z.number(),
    isVideoCallSoundOn: z.number(),
    isNotifAlertOn: z.number(),
    isNotifSoundOn: z.number(),
    chatSoundName: z.string(),
    videoCallSoundName: z.string(),
    voiceCallSoundName: z.string(),
    notifSoundName: z.string(),
    whoAdded: z.number(),
    whenAdded: z.number(),
    whoUpdated: z.number(),
    whenUpdated: z.number(),
})

export type UserSettingType = z.infer<typeof userSettingSchema>

export const userDetailSchema = z.object({
    user: userSchema,
    userField: userFieldSchema,
    userCreditCard: userCreditCardSchema,
    userSubscription: userSubscriptionSchema,
    userSetting: userSettingSchema,
})

export type UserDetailType = z.infer<typeof userDetailSchema>

export const getUserDataSchema = z.object({
    status: statusSchema,
    userDetail: userDetailSchema,
})

export type GetUserDataType = z.infer<typeof getUserDataSchema>

export const twilioTokenSchema = z.object({
    token: z.string(),
})

export type TwilioTokenType = z.infer<typeof twilioTokenSchema>

export const getTwilioTokenSchema = z.object({
    status: statusSchema,
    tokenTwilio: twilioTokenSchema,
})

export type GetTwilioTokenType = z.infer<typeof getTwilioTokenSchema>

export const getTwilioTokenParamsSchema = z.object({
    userId: z.number(),
    channelType: z.enum(['fcm', 'apn']),
})

export type GetTwilioTokenParamsType = z.infer<
    typeof getTwilioTokenParamsSchema
>

export const saveDeviceTokenSchema = z.object({
    fcmToken: z.string(),
    deviceToken: z.string().optional(),
    platform: z.string(),
})

export type SaveDeviceTokenType = z.infer<typeof saveDeviceTokenSchema>

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
})
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>

export const newPasswordSchema = z
    .object({
        password: z.string(),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

export type NewPasswordType = z.infer<typeof newPasswordSchema>

export const verifyCodeSchema = z.object({
    conf_code: z.number(),
})
export type VerifyCodeType = z.infer<typeof verifyCodeSchema>

export const resetPasswordSchema = z.object({
    user_id: z.number(),
    password: z.string(),
    who_updated: z.number(),
    phone_no: z.number(),
    conf_code: z.number(),
})
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>

export const verifyPhoneSchema = z.object({
    user_id: z.number(),
    phone_no: z.string(),
    conf_code: z.number(),
})
export type VerifyPhoneType = z.infer<typeof verifyPhoneSchema>

export const registrationPasswordSchema = z
    .object({
        username: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

export type RegistrationPasswordType = z.infer<
    typeof registrationPasswordSchema
>

export const updateUserRegistrationSchema = z.object({
    user_id: z.number(),
    upd_mode: z.string(),
    who_updated: z.number(),
    user_name: z.string(),
    password: z.string(),
})
export type UpdateUserRegistrationType = z.infer<
    typeof updateUserRegistrationSchema
>

export const checkUsernameSchema = z.object({
    user_name: z.string(),
})
export type CheckUsernameType = z.infer<typeof checkUsernameSchema>

export const updateUserSettingSchema = z.object({
    user_id: z.number(),
    upd_mode: z.string(),
    who_updated: z.number(),
    is_general_sound_on: z.number(),
    is_general_alert_on: z.number(),
    is_reachability_status_on: z.number(),
    is_chat_alert_on: z.number(),
    is_chat_sound_on: z.number(),
    is_voicecall_alert_on: z.number(),
    is_voicecall_sound_on: z.number(),
    is_videocall_alert_on: z.number(),
    is_videocall_sound_on: z.number(),
    is_notif_alert_on: z.number(),
    is_notif_sound_on: z.number(),
    chat_soundname: z.string(),
    voicecall_soundname: z.string(),
    videocall_soundname: z.string(),
    notif_soundname: z.string(),
})

export type UpdateUserSettingsType = z.infer<typeof updateUserSettingSchema>

export const resendCodeSchema = z.object({
    user_id: z.number(),
    phone_no: z.number(),
})
export type ResendCodeType = z.infer<typeof resendCodeSchema>

export const verifyReferralCodeSchema = z.object({
    user_id: z.number(),
    referral_code: z.string(),
})
export type VerifyReferralCodeType = z.infer<typeof verifyReferralCodeSchema>

export const updateUserReferralSchema = z.object({
    user_id: z.number(),
    who_updated: z.number(),
    upd_mode: z.string(),
    conf_code: z.string(),
})
export type UpdateUserReferralType = z.infer<typeof updateUserReferralSchema>

export const userMediaSchema = z.object({
    media_id: z.number(),
    media_album_id: z.number(),
    album_name: z.string(),
    path: z.string(),
    s3_path: z.string(),
    s3_path_100: z.string(),
    s3_path_500: z.string(),
    s3_path_1024: z.string(),
    status: z.string(),
    media_type: z.string(),
    media_format: z.string(),
    title: z.string(),
    who_added: z.number(),
    when_added: z.number(),
    who_updated: z.number(),
    when_updated: z.number(),
})

export type UserMediaType = z.infer<typeof userMediaSchema>

export const getUserMediaGallerySchema = z.object({
    status: statusSchema,
    media: z.array(userMediaSchema),
})

export type GetUserMediaGalleryType = z.infer<typeof getUserMediaGallerySchema>

export const updateUserPhotoSchema = z.object({
    user_id: z.number(),
    who_updated: z.number(),
    upd_mode: z.string(),
    profile_photos: z.string(),
})
export type UpdateUserPhotoType = z.infer<typeof updateUserPhotoSchema>

export const deleteUserMediaApiSchema = z.object({
    media_id: z.number(),
    who_added: z.number(),
    is_primary: z.boolean(),
})
export type DeleteUserMediaType = z.infer<typeof deleteUserMediaApiSchema>

export const uploadPhotoSchema = z.object({
    imageUri: z.string(),
    userId: z.string(),
    isPrimary: z.boolean(),
})
export type UploadPhotoType = z.infer<typeof uploadPhotoSchema>

export const lookUpReturnSchema = z.object({
    code: z.string(),
    description: z.string(),
})

export const lookUpSchema = z.object({
    lookUp: z.array(lookUpReturnSchema),
})
export type LookUpReturnType = z.infer<typeof lookUpSchema>

export const myLocationSchema = z.object({
    country: z.string(),
    zip_code: z.string(),
    state: z.string(),
    city: z.string(),
})
export type MyLocationType = z.infer<typeof myLocationSchema>

export const changePasswordFormSchema = z
    .object({
        password: z.string(),
        newPassword: z.string(),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Password does not match',
        path: ['confirmPassword'],
    })

export type ChangePasswordFormType = z.infer<typeof changePasswordFormSchema>

export const changePasswordSchema = z.object({
    user_id: z.number(),
    current_password: z.string(),
    new_password: z.string(),
})

export type ChangePasswordType = z.infer<typeof changePasswordSchema>

export const checkEmailSchema = z.object({
    email: z.string(),
})
export type CheckEmailType = z.infer<typeof checkEmailSchema>

export const updateEmailSchema = z.object({
    user_id: z.number(),
    upd_mode: z.string(),
    who_updated: z.number(),
    email: z.string(),
})
export type UpdateEmailType = z.infer<typeof updateEmailSchema>

export const updateMobileNumberFormSchema = z.object({
    phoneNumber: z.string(),
    password: z.string(),
})
export type UpdateMobileNumberFormType = z.infer<
    typeof updateMobileNumberFormSchema
>

export const sendOTPSchema = z.object({
    user_id: z.number(),
    phone_no: z.string(),
})
export type SendOTPType = z.infer<typeof sendOTPSchema>

export const updateMobileNumberSchema = z.object({
    user_id: z.number(),
    upd_mode: z.string(),
    who_updated: z.number(),
    phone_no: z.string(),
})
export type UpdateMobileNumberType = z.infer<typeof updateMobileNumberSchema>

export const updateUserSubscriptionSchema = z.object({
    user_id: z.number(),
    upd_mode: z.string(),
    who_updated: z.number(),
    membership_plan_id: z.number(),
})
export type UpdateUserSubscriptionType = z.infer<
    typeof updateUserSubscriptionSchema
>

export type UpdateUserType =
    | UpdateUserRegistrationType
    | UpdateUserSettingsType
    | UpdateUserReferralType
    | UpdateEmailType
    | UpdateMobileNumberType
    | UpdateUserSubscriptionType
    | UpdateUserPhotoType

export const registerUserSchema = z.object({
    userId: z.number(),
    email: z.string(),
})
export type RegisterUserType = z.infer<typeof registerUserSchema>

export const userUpdateFieldSchema = z.object({
    user_id: z.number(),
    upd_mode: z.enum([
        'USER_BIRTHDAY',
        'USER_EMAIL_ADDRESS',
        'USER_GENDER',
        'USER_USERNAME_PASSWORD',
        'USER_PHONE_NO',
        'USER_ABOUT',
        'USER_ADDRESS',
        'USER_POSITION',
        'UPD_MODE_USER_ADDRESS_AND_POSITION',
        'USER_LOCATION',
        'USER_BODY_TYPE',
        'USER_CREDIT_CARD',
        'USER_EDUC_LEVEL',
        'USER_ETHNICITY',
        'USER_EYE_COLOR',
        'USER_EXER_REGIMEN',
        'USER_HAIR_COLOR',
        'USER_HEIGHT',
        'USER_HOBBY',
        'USER_INCOME_LEVEL',
        'USER_KID_SITUATION',
        'USER_LANGUAGE',
        'USER_LAST_POS_LAST',
        'USER_LAST_POS_LNG',
        'USER_LOOKING_FOR_GENDER',
        'USER_MEMBERSHIP',
        'USER_SUBSCRIPTION_STATUS',
        'USER_VIEWABILITY_STATUS',
        'USER_HOMETOWN',
        'USER_PET_POLICY',
        'USER_POS_POLITICS',
        'USER_PREF_ALCOHOL',
        'USER_PREF_SMOKING',
        'USER_PROFESSION',
        'USER_PROFILE_PHOTO',
        'USER_RELATIONSHIP_TYPE',
        'USER_RELATIONSHIP_STATUS',
        'USER_RELIGION',
        'USER_SETTING',
        'USER_STATUS',
        'USER_ZIP_CODE',
        'REFERRED_BY',
    ]),
    who_updated: z.number(),
    conf_code: z.string().optional(),
    phone_no: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    birthday: z.string().optional(),
    gender: z.string().optional(),
    relationship_type: z.string().optional(),
    relationship_status: z.string().optional(),
    relationship_status_desc: z.string().optional(),
    looking_for_gender: z.string().optional(),
    about: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    zip_code: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    is_location_on: z.boolean().optional(),
    relig_belief: z.string().optional(),
    relig_belief_desc: z.string().optional(),
    profile_photos: z.string().optional(),
    language_code: z.string().optional(),
    height: z.string().optional(),
    body_type: z.string().optional(),
    hair_color: z.string().optional(),
    eye_color: z.string().optional(),
    educ_level: z.string().optional(),
    ethnicity: z.string().optional(),
    income_level: z.string().optional(),
    pet_policy: z.string().optional(),
    pref_alcohol: z.string().optional(),
    pref_smoking: z.string().optional(),
    exer_regimen: z.string().optional(),
    profession: z.string().optional(),
    pos_politics: z.string().optional(),
    kid_situation: z.string().optional(),
    hobby_code: z.string().optional(),
    status: z.string().optional(),
    card_number: z.string().optional(),
    expiration: z.string().optional(),
    ccv: z.string().optional(),
    name_on_card: z.string().optional(),
    membership_plan_id: z.number().optional(),
    email: z.string().optional(),
})

export type UserUpdateFieldType = z.infer<typeof userUpdateFieldSchema>
