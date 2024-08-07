import React, { useState } from 'react'
import { View, Text, Dimensions, Switch } from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerContentComponentProps,
} from '@react-navigation/drawer'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { IMG_NO_AVATAR } from '@/dictionary/images'
import Divider from '../../../../components/shared/divider'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useAtomValue, useSetAtom } from 'jotai'
import { userDataAtom, userTokenTwilioAtom } from '@/store/user'
import { Image } from 'expo-image'
import { UpdateUserSettingsType } from '@/services/endpoints/user/schema'
import { updateUserApi } from '@/services/endpoints/user'
import { useMutation } from '@tanstack/react-query'
import {
    UPD_MODE_USER_SETTING,
    USER_SUBSCRIPTION_ELITE,
    USER_SUBSCRIPTION_PRIVACY,
    USER_SUBSCRIPTION_REGULAR,
} from '@/dictionary/contants'
import { twilioClientAtom } from '@/store/twilio'
import { authAtom } from '@/store/auth'
import { axiosInstance } from '@/services/axios'
import { mmkvClearAllKeys } from '@/store/mmkv'
import { AuthType } from '@/services/endpoints/auth/schema'

import { Footer } from '../../../../components/shared/footer'
import TextScalable from '@/components/shared/text-scale'
import { cn } from '@/lib/util'
import { queryClient } from '@/store/query-client'

interface DrawerMenuItem {
    id: number
    title: string
    icon: keyof typeof MaterialCommunityIcons.glyphMap
    path: string
}

const drawerMenus: DrawerMenuItem[] = [
    {
        id: 1,
        title: 'Rewards',
        icon: 'gift-outline',
        path: '(auth)/drawer-menu/rewards/refer-friend',
    },
    {
        id: 2,
        title: 'Settings',
        icon: 'bell-outline',
        path: '(aux)/drawer-menu/settings',
    },
    {
        id: 3,
        title: 'My Profile',
        icon: 'account-outline',
        path: '(aux)/drawer-menu/my-profile',
    },
    {
        id: 4,
        title: 'My Pictures',
        icon: 'camera-outline',
        path: '(aux)/drawer-menu/my-picture',
    },
    {
        id: 5,
        title: 'My Account',
        icon: 'account-circle-outline',
        path: '(aux)/drawer-menu/my-account',
    },
    {
        id: 7,
        title: 'Blocked Profiles',
        icon: 'block-helper',
        path: '(aux)/drawer-menu/blocked-profile',
    },
    {
        id: 8,
        title: 'Report Issues',
        icon: 'flag-outline',
        path: '(aux)/drawer-menu/report-issue',
    },
    {
        id: 9,
        title: 'About Us',
        icon: 'information-outline',
        path: '(aux)/drawer-menu/about-us',
    },
    {
        id: 10,
        title: 'Logout',
        icon: 'logout-variant',
        path: '(auth)/home',
    },
]
const { width } = Dimensions.get('window')

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
    const userData = useAtomValue(userDataAtom)
    const [viewableStatus, setViewableStatus] = useState<boolean>(false)

    const [isOn, setIsOn] = useState<boolean>(
        userData.userSetting?.isReachabilityStatusOn === 1,
    )

    const updateUserSettingsMutation = useMutation({
        mutationKey: ['update-user-settings'],
        mutationFn: (data: UpdateUserSettingsType) => updateUserApi(data),
    })

    const handleIsActive = (isEnabled: boolean) => {
        const userSettingsToSave = {
            user_id: userData.user.userId,
            upd_mode: UPD_MODE_USER_SETTING,
            who_updated: userData.user.userId,
            is_general_sound_on: isEnabled ? 1 : 0,
            is_general_alert_on: isEnabled ? 1 : 0,
            is_reachability_status_on: isEnabled ? 1 : 0,
            is_chat_alert_on: userData.userSetting.isChatAlertOn,
            is_chat_sound_on: userData.userSetting.isChatSoundOn,
            is_voicecall_alert_on: userData.userSetting.isVoiceCallAlertOn,
            is_voicecall_sound_on: userData.userSetting.isVoiceCallSoundOn,
            is_videocall_alert_on: userData.userSetting.isVideoCallAlertOn,
            is_videocall_sound_on: userData.userSetting.isVideoCallSoundOn,
            is_notif_alert_on: userData.userSetting.isNotifAlertOn,
            is_notif_sound_on: userData.userSetting.isNotifSoundOn,
            chat_soundname: userData.userSetting.chatSoundName,
            voicecall_soundname: userData.userSetting.voiceCallSoundName,
            videocall_soundname: userData.userSetting.videoCallSoundName,
            notif_soundname: userData.userSetting.notifSoundName,
        }
        setIsOn(isEnabled)

        updateUserSettingsMutation.mutate(userSettingsToSave)
    }

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#FCC242' }}
            edges={['top']}
        >
            <View className="flex-col bg-[#F1F1F2]" style={{ flex: 1 }}>
                <LinearGradient
                    colors={['#FCC242', '#F69940', '#F1753E']}
                    className="relative"
                >
                    <View className="m-3">
                        <TouchableOpacity
                            onPress={() => router.push('dashboard')}
                            className="items-end mt-2.5 mr-2.5"
                        >
                            <Ionicons name="home" size={28} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderRadius: width * 0.15,
                                overflow: 'hidden',
                            }}
                            className="mt-2.5 w-24 h-24 items-center self-center"
                            onPress={() =>
                                router.push('(aux)/drawer-menu/my-profile')
                            }
                        >
                            <Image
                                source={
                                    userData.user?.mediaProfile || IMG_NO_AVATAR
                                }
                                className=" w-full h-full "
                                transition={1000}
                            />
                        </TouchableOpacity>

                        <TextScalable
                            fontSize={25}
                            fontClassname="text-white font-bold mt-2.5 text-center"
                        >
                            {userData?.user?.userName}
                        </TextScalable>
                        <View className="flex-row justify-between items-center my-1.5">
                            <TextScalable
                                fontSize={16}
                                fontClassname="text-white"
                            >
                                Your Profile is: {isOn ? 'Active' : 'Offline'}
                            </TextScalable>

                            <Switch
                                trackColor={{
                                    false: '#BFBFBF',
                                    true: '#00b82d',
                                }}
                                value={isOn}
                                onValueChange={handleIsActive}
                                ios_backgroundColor="#BFBFBF"
                            />
                        </View>

                        {!isOn && (
                            <TextScalable
                                fontSize={14}
                                fontClassname="text-white mx-10"
                            >
                                You will no longer receive messages or appear in
                                searches.
                            </TextScalable>
                        )}

                        <Divider />
                        <View>
                            <TouchableOpacity
                                className="flex-row justify-between items-center my-1.5"
                                onPress={() =>
                                    setViewableStatus(!viewableStatus)
                                }
                            >
                                <TextScalable
                                    fontSize={16}
                                    fontClassname="text-white"
                                >
                                    Membership Level Setting
                                </TextScalable>
                                <MaterialCommunityIcons
                                    size={width * 0.07}
                                    name={
                                        !viewableStatus
                                            ? 'chevron-right'
                                            : 'chevron-down'
                                    }
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                        <MembershipMenu viewableStatus={viewableStatus} />
                    </View>
                </LinearGradient>
                <DrawerContentScrollView
                    {...props}
                    contentContainerStyle={{ paddingTop: 0, flex: 1 }}
                >
                    <DrawerMenu />
                </DrawerContentScrollView>
                <Footer />
            </View>
        </SafeAreaView>
    )
}

export default CustomDrawerContent

const DrawerMenu = () => {
    const setTwilioToken = useSetAtom(userTokenTwilioAtom)
    const setAuth = useSetAtom(authAtom)
    const twilioClient = useAtomValue(twilioClientAtom)
    const removeStates = async () => {
        setAuth({
            token: '',
            authenticated: false,
            user: {} as AuthType,
        })
        setTwilioToken('')
        mmkvClearAllKeys()
        queryClient.clear()
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

    const handleOnPress = (item: DrawerMenuItem) => {
        if (item.title === 'Logout') {
            logout()
            return
        }
        router.push(item.path)
    }
    return (
        <>
            <ScrollView>
                {drawerMenus.map((item, index) => (
                    <View key={index}>
                        <View className="mr-3 flex-row items-center border-b border-b-slate-300  ">
                            <DrawerItem
                                label={() => (
                                    <Text className="text-gray-600 text-xl -ml-5">
                                        {item.title}
                                    </Text>
                                )}
                                onPress={() => handleOnPress(item)}
                                icon={() => (
                                    <MaterialCommunityIcons
                                        size={width * 0.07}
                                        name={item.icon}
                                        color="#F57435"
                                    />
                                )}
                                style={{ flex: 1 }}
                            />
                            {item.title !== 'Logout' && (
                                <MaterialCommunityIcons
                                    size={width * 0.07}
                                    name="chevron-right"
                                    color="#707070"
                                />
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </>
    )
}

interface membershipMenuProps {
    viewableStatus: boolean
}

const MembershipMenu: React.FC<membershipMenuProps> = (props) => {
    const { viewableStatus } = props
    const [, setSelectedOption] = useState<string | null>(null)
    const userData = useAtomValue(userDataAtom)
    const viewabilityStatusMenus = [
        {
            membership: 'Regular Member',
            viewabilityStatus: USER_SUBSCRIPTION_REGULAR,
            isActive:
                userData?.userSubscription?.viewabilityStatus ===
                USER_SUBSCRIPTION_REGULAR,
            isDisable: false,
        },
        {
            membership: 'Privacy Member',
            viewabilityStatus: USER_SUBSCRIPTION_PRIVACY,
            isActive:
                userData?.userSubscription?.viewabilityStatus ===
                USER_SUBSCRIPTION_PRIVACY,
            isDisable:
                userData?.userSubscription?.membershipLevelCode !==
                    USER_SUBSCRIPTION_PRIVACY &&
                userData?.userSubscription?.membershipLevelCode !==
                    USER_SUBSCRIPTION_ELITE,
        },
        {
            membership: 'Elite Member',
            viewabilityStatus: USER_SUBSCRIPTION_ELITE,
            isActive:
                userData?.userSubscription?.viewabilityStatus ===
                USER_SUBSCRIPTION_ELITE,
            isDisable:
                userData?.userSubscription?.membershipLevelCode !==
                USER_SUBSCRIPTION_ELITE,
        },
    ]

    return (
        <>
            {viewableStatus && (
                <View className="ml-6">
                    {viewabilityStatusMenus.map((index, key) => {
                        const isActive =
                            userData.userSubscription.membershipLevelCode ===
                            index.viewabilityStatus
                        return (
                            <TouchableOpacity
                                key={key}
                                className="flex-row items-center mb-2"
                                disabled
                            >
                                <MaterialCommunityIcons
                                    size={width * 0.07}
                                    name={
                                        isActive
                                            ? 'radiobox-marked'
                                            : 'radiobox-blank'
                                    }
                                    color={cn(isActive ? 'white' : '#BFBFBF')}
                                />
                                <TextScalable
                                    fontSize={14}
                                    fontClassname={cn(
                                        `ml-2`,
                                        isActive
                                            ? 'text-white'
                                            : 'text-[#BFBFBF]',
                                    )}
                                >
                                    {index.membership}
                                </TextScalable>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )}
        </>
    )
}
