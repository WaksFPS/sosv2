import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

const users = [
    {
        id: 1,
        name: 'Modesto',
        age: 25,
        location: 'Meycauayan City, Bulacan, Philippines',
        date: 'Last Fri',
    },
    {
        id: 2,
        name: 'Modesto',
        age: 25,
        location: 'Meycauayan City, Bulacan, Philippines',
        date: '3 Apr',
    },
    {
        id: 3,
        name: 'Modesto',
        age: 25,
        location: 'Meycauayan City, Bulacan, Philippines',
        date: '15 Mar',
    },
]

const ViewTab = () => {
    return (
        <SafeAreaView>
            {users.map((user) => (
                <View
                    key={user.id}
                    className="bg-white rounded-2xl flex-row items-center justify-between p-2 mb-2"
                >
                    <Text className="bg-slate-200 rounded-2xl">
                        <MaterialCommunityIcons
                            size={100}
                            name="account"
                            color="gray"
                        />
                    </Text>
                    <View className="flex-1 ml-4 justify-between">
                        <Text className="text-slate-700 mb-2">
                            {user.name}, {user.age}
                        </Text>
                        <Text className="text-slate-600 mb-2 whitespace-normal break-all">
                            {user.location}
                        </Text>
                        <Text className="text-slate-600 mb-2">{user.date}</Text>
                    </View>
                </View>
            ))}
        </SafeAreaView>
    )
}

export default ViewTab
