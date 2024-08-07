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

interface BrandedHeaderSearchBarProps {
    title: string
    noGradient?: boolean
    containerClassname?: string
    onChangeSearch: (text: string) => void
}

export const BrandedHeaderSearchBar = ({
    title,
    noGradient = false,
    containerClassname,
    onChangeSearch,
}: BrandedHeaderSearchBarProps) => {
    const safeArea = useSafeAreaInsets()

    if (noGradient)
        return (
            <BareNavigation
                title={title}
                containerClassname={containerClassname}
                style={{ paddingTop: safeArea.top }}
                onChangeSearch={onChangeSearch}
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
                containerClassname={containerClassname}
                onChangeSearch={onChangeSearch}
            />
        </LinearGradient>
    )
}

interface BareNavigationProps {
    title: string
    containerClassname?: string
    style?: StyleProp<ViewStyle>
    onChangeSearch: (text: string) => void
}

const BareNavigation = ({
    containerClassname,
    title,
    style,
    onChangeSearch,
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
            <View className="flex-row items-center justify-center">
                <View className="flex-row bg-white rounded-lg px-32">
                    <TextInput
                        className="py-2 text-gray-500"
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                    />
                </View>
            </View>
        </View>
    )
}
