import { cn } from '@/lib/util'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useNavigation, usePathname, router } from 'expo-router'
import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleProp,
    ViewStyle,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DrawerActions } from '@react-navigation/native'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Avatar from './avatar'
import TextScalable from './text-scale'
import { UserType } from '@/services/endpoints/user/schema'

interface BrandedHeaderConnectUserProps {
    title: string
    connectedUser: UserType
    noGradient?: boolean
    containerClassname?: string
}

export const BrandedHeaderConnectUser = ({
    title,
    connectedUser,
    noGradient = false,
    containerClassname,
}: BrandedHeaderConnectUserProps) => {
    const safeArea = useSafeAreaInsets()

    if (noGradient)
        return (
            <BareNavigation
                title={title}
                user={connectedUser}
                containerClassname={containerClassname}
                style={{ paddingTop: safeArea.top }}
            />
        )

    return (
        <LinearGradient
            colors={['#FDC830', '#F57435']}
            className={cn(
                'h-2/5 rounded-b-3xl justify-center',
                containerClassname,
            )}
            style={{
                paddingTop: safeArea.top,
            }}
        >
            <BareNavigation
                title={title}
                user={connectedUser}
                containerClassname={containerClassname}
            />
        </LinearGradient>
    )
}

interface BareNavigationProps {
    title: string
    user: UserType
    containerClassname?: string
    style?: StyleProp<ViewStyle>
}

const BareNavigation = ({
    containerClassname,
    title,
    style,
    user,
}: BareNavigationProps) => {
    const navigation = useNavigation()

    return (
        <View className="space-y-4">
            <View
                className={cn(
                    'flex-row items-center justify-between px-5',
                    containerClassname,
                )}
                style={style}
            >
                <TouchableOpacity
                    className="justify-center p-4"
                    onPress={() =>
                        navigation.dispatch(DrawerActions.openDrawer())
                    }
                >
                    <MaterialCommunityIcons
                        size={28}
                        name="menu"
                        color="white"
                    />
                </TouchableOpacity>

                <View className="">
                    {title && (
                        <Text className="font-bold text-lg text-white">
                            {title}
                        </Text>
                    )}
                </View>
                <TouchableOpacity
                    className="justify-center p-4"
                    onPress={() => router.push('dashboard')}
                >
                    <MaterialCommunityIcons
                        size={28}
                        name="home"
                        color="white"
                    />
                </TouchableOpacity>
            </View>
            <View className="flex- items-center justify-center">
                <Avatar
                    uri={user.mediaProfile}
                    imageClassName="mt-4 h-28 w-28"
                />
                <TextScalable
                    fontClassname="mx-auto color-white font-bold mt-3"
                    fontSize={24}
                >
                    {`${user.firstName} ${user.lastName}`}
                </TextScalable>
            </View>
        </View>
    )
}
