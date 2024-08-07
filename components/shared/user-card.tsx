import React from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { IMG_USER } from '@/dictionary/images'

interface UserCardProps {
    user: {
        image?: string
        name: string
        age: number
        location: string
    }
    onPress: () => void
}

const UserCard = ({ user, onPress }: UserCardProps) => {
    return (
        <View className="p-3 mb-2 w-1/3">
            <View className="bg-zinc-200 w-32 h-52 rounded-xl overflow-hidden ">
                <TouchableOpacity onPress={onPress} className="items-center">
                    <ImageBackground
                        resizeMode="contain"
                        className="w-14 h-52 items-center"
                        source={user.image ? user.image : IMG_USER}
                    />
                    <View className="bg-black opacity-50 rounded-xl bottom-0 right-0 left-0 absolute p-1">
                        <Text
                            className="text-white font-bold text-base"
                            numberOfLines={1}
                        >
                            {user.name}
                        </Text>
                        <Text className="text-white " numberOfLines={1}>
                            {user.age}, {user.location}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserCard
