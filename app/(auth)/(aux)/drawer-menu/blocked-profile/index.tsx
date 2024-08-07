import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NO_BLOCKED_USERS } from '@/dictionary/images'
import EmptyHandler from '@/app/(auth)/(aux)/drawer-menu/blocked-profile/-components/empty-handler'
import BlockedItem from '@/app/(auth)/(aux)/drawer-menu/blocked-profile/-components/blocked-item'
import { TITLE_NO_BLOCKED_USER, DESC_NO_BLOCKED_USER,
} from '@/dictionary/contants'
import { FlashList } from '@shopify/flash-list'

const BlockedProfile = () => {
    return (
        <View className="flex-1 align-center">
            <LinearGradient colors={['#FDC830', '#F57435']} className="p-2">
                <SafeAreaView>
                    <View className="flex-row mb-2 ml-8">
                        <Text className="mx-auto color-white font-bold text-xl">
                            Blocked Profile
                        </Text>
                        <TouchableOpacity>
                            <Ionicons name="home" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                <View className="items-center justify-center"></View>
            </LinearGradient>
            <FlashList
                data={blockedUsers}
                renderItem={({ item }) => (
                    <BlockedItem
                        item={item}
                        currentUserId={1}
                        onPressBlockedProfile={() => {}}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                    <EmptyHandler
                        title={TITLE_NO_BLOCKED_USER}
                        description={DESC_NO_BLOCKED_USER}
                        image={NO_BLOCKED_USERS}
                    />
                )}
                extraData={blockedUsers}
            />
        </View>
    )
}

export default BlockedProfile

// Dummy data
const blockedUsers: any = [
    {
        user: {
            mediaProfile:
                'https://i.pinimg.com/736x/e5/59/a4/e559a43c018434ed69c5220f85f0f6d6.jpg',
            userName: 'Bocchi',
        },
    },
    {
        user: {
            mediaProfile:
                'https://static.wikia.nocookie.net/bocchi-the-rock/images/0/0e/Seika_Ijichi.png/revision/latest?cb=20221109234637',
            userName: 'Seika',
        },
    },
    {
        user: {
            mediaProfile: '',
            userName: 'Kikuri',
        },
    },
]
