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
    TextInput,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DrawerActions } from '@react-navigation/native'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
export interface NavigationItem {
    href: string
    title: string
}

interface BrandedHeaderMenuProps {
    items: NavigationItem[]
    title: string
    noGradient?: boolean
    containerClassname?: string
}

export const BrandedHeaderMenu = ({
    items,
    title,
    noGradient = false,
    containerClassname,
}: BrandedHeaderMenuProps) => {
    const safeArea = useSafeAreaInsets()

    if (noGradient)
        return (
            <BareNavigation
                title={title}
                items={items}
                containerClassname={containerClassname}
                style={{ paddingTop: safeArea.top }}
            />
        )

    return (
        <LinearGradient
            colors={['#FDC830', '#F57435']}
            className={cn(
                'h-1/5 rounded-b-3xl justify-center',
                containerClassname,
            )}
            style={{
                paddingTop: safeArea.top,
            }}
        >
            <BareNavigation
                title={title}
                items={items}
                containerClassname={containerClassname}
            />
        </LinearGradient>
    )
}

interface BareNavigationProps {
    title: string
    items: NavigationItem[]
    containerClassname?: string
    style?: StyleProp<ViewStyle>
}

const BareNavigation = ({
    items,
    containerClassname,
    title,
    style,
}: BareNavigationProps) => {
    const navigation = useNavigation()
    const pathName = usePathname()
    console.log('pathName', pathName)

    const truePath = pathName.replace('/', '')
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
            <View className="flex-row items-center justify-center">
                {items.map((item, index) => (
                    <Link replace key={index} href={item.href} asChild>
                        <TouchableOpacity
                            className={cn(
                                'px-2.5 py-1.5 rounded-full',
                                truePath === item.href && 'bg-white',
                            )}
                        >
                            <Text
                                className={cn(
                                    'text-white',
                                    truePath === item.href &&
                                        'text-background-alt font-bold',
                                )}
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </View>
    )
}
