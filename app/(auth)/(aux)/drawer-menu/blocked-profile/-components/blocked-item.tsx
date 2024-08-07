import React, { FC } from 'react'
import { TouchableOpacity, View, Text, Image, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface BlockedItemProps {
    item: any
    currentUserId: number
    onPressBlockedProfile: any
}

const handleOnDelete = () => {
    Alert.alert(
        'Unblock User',
        'Are you sure that you want to unblock this user?',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
    )
}

const shadowStyle = {
    shadowColor: 'black',
    shadowOffset: {
        height: 2,
        width: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
}

const BlockedItem: FC<BlockedItemProps> = ({
    item,
    currentUserId,
    onPressBlockedProfile,
}) => {
    const { mediaProfile, userName } = item.user
    //  const { whenChanged } = item.auConnection;
    console.log(mediaProfile)
    return (
        <TouchableOpacity
            onPress={() =>
                onPressBlockedProfile(currentUserId, item.user.userId)
            }
            className="flex-row items-center justify-between rounded-3xl mx-5 mt-5 py-1 bg-white"
            style={shadowStyle}
        >
            {mediaProfile ? (
                <View className=" flex items-center justify-center m-4 rounded-full">
                    <Image
                        source={{ uri: mediaProfile }}
                        className="bg-contain w-16 h-16 mx-auto my-2 rounded-full"
                    />
                </View>
            ) : (
                <View className="bg-gray-300 flex items-center justify-center m-4 p-5 rounded-full">
                    <Ionicons name="person" size={30} color="gray" />
                </View>
            )}

            <View className="  flex-auto flex-col justify-center">
                <Text className="text-base">{userName}</Text>
                <Text className="text-sm">{'an hour ago'}</Text>
            </View>
            <TouchableOpacity className="flex-1" onPress={handleOnDelete}>
                <Text className="text-orange-500">Unblock</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default BlockedItem
