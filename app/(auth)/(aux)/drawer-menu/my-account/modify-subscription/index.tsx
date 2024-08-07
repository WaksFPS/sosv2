import TextScalable from '@/components/shared/text-scale'
import {
    USER_SUBSCRIPTION_ELITE,
    USER_SUBSCRIPTION_PRIVACY,
    USER_SUBSCRIPTION_REGULAR,
    USER_SUBSCRIPTION_STATUS_END,
    USER_SUBSCRIPTION_STATUS_EXPIRED,
} from '@/dictionary/contants'
import { subscriptionStatusAtom, userDataAtom } from '@/store/user'
import { useAtomValue } from 'jotai'
import React from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import CustomIconDiamond from '@/components/shared/custom-icon-diamond'
import { router } from 'expo-router'
import { cn } from '@/lib/util'
import dayjs from 'dayjs'

const ModifySubscriptionPage = () => {
    const { width } = Dimensions.get('window')

    const userData = useAtomValue(userDataAtom)
    const hasSubscriptionEnded = useAtomValue(subscriptionStatusAtom)

    let userSubscriptionDesc = ''
    let iconBadge: JSX.Element | null = null

    switch (userData.userSubscription.membershipLevelCode) {
        case USER_SUBSCRIPTION_REGULAR:
            userSubscriptionDesc = 'Regular'
            iconBadge = <></>
            break
        case USER_SUBSCRIPTION_PRIVACY:
            userSubscriptionDesc = 'Privacy'
            iconBadge = (
                <MaterialCommunityIcons
                    name="sunglasses"
                    size={28}
                    color="black"
                />
            )
            break
        case USER_SUBSCRIPTION_ELITE:
            userSubscriptionDesc = 'Elite'
            iconBadge = (
                <CustomIconDiamond name="Diamond" size={23} color="#F37335" />
            )
            break
    }
    const handleOnPress = (option: string) => {
        if (option === 'MS') {
            router.push({
                pathname: '/(aux)/membership',
                params: {
                    fromAuth: 'true',
                },
            })
        } else {
            router.push({
                pathname:
                    '(aux)/drawer-menu/my-account/modify-subscription/unsubscribe/confirmation',
                params: {
                    user_id: userData.user.userId,
                    phone_number: userData.user.phoneNo,
                },
            })
        }
    }

    return (
        <>
            <TextScalable
                fontSize={12}
                fontClassname="pt-2 px-5 text-[#707070]"
            >
                {userData.userSubscription.status ===
                    USER_SUBSCRIPTION_STATUS_EXPIRED && hasSubscriptionEnded ? (
                    'Your subscription has expired.'
                ) : userData.userSubscription.status ===
                  USER_SUBSCRIPTION_STATUS_END ? (
                    ''
                ) : (
                    <>
                        Your {iconBadge} {userSubscriptionDesc} Subscription
                        will end on{' '}
                        {dayjs
                            .unix(userData.userSubscription.subscriptionPlanEnd)
                            .format('MMMM D, YYYY')}
                    </>
                )}
            </TextScalable>
            <View className="flex-grow px-4">
                <View className="py-4">
                    <TouchableOpacity
                        style={{
                            elevation: 5,
                            shadowOffset: {
                                height: 2,
                                width: 2,
                            },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                        }}
                        className="px-5 py-3 my-1.5 bg-white rounded-xl flex flex-row items-center justify-between"
                        onPress={() => handleOnPress('MS')}
                    >
                        <TextScalable
                            fontSize={19}
                            fontClassname="text-xl text-gray-500 capitalize"
                        >
                            Update My Subscription
                        </TextScalable>
                        <MaterialCommunityIcons
                            name="chevron-right"
                            size={width * 0.07}
                            color="#F37335"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View className="px-4">
                <TouchableOpacity
                    style={{
                        elevation: 5,
                        shadowOffset: {
                            height: 2,
                            width: 2,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                        backgroundColor: 'rgba(255,255,255,0.7)',
                    }}
                    className="px-5 py-3 my-1.5 bg-white rounded-xl mb-[5%] items-center"
                    onPress={() => handleOnPress('ES')}
                    disabled={hasSubscriptionEnded}
                >
                    <TextScalable
                        fontSize={19}
                        fontClassname={cn(
                            `text-xl capitalize`,
                            hasSubscriptionEnded
                                ? `text-red-500/50`
                                : `text-red-500`,
                        )}
                    >
                        End My Subscription
                    </TextScalable>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ModifySubscriptionPage
