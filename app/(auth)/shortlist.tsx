import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { useState } from 'react'
import { HEART_PLUS, IMG_USER } from '@/dictionary/images'
import { Link } from '@/components/shared/link'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserCard from '@/components/shared/user-card'

interface User {
    image?: string
    name: string
    age: number
    location: string
}

const dummyData: User[] = [
    { name: 'Ada Wong', age: 39, location: 'United States' },
    { name: 'Leon Kennedy', age: 36, location: 'United States' },
    { name: 'Ashley Graham', age: 20, location: 'United States' },
    { name: 'Jill Valentine', age: 34, location: 'United States' },
    { name: 'Claire Redfield', age: 19, location: 'United States' },
]

const ShortListPage = () => {
    const [users, setUsers] = useState(dummyData)

    const userProfile = () => {
        console.log('func to user profile')
    }

    return (
        <SafeAreaView className="flex">
            <View className="flex flex-row flex-wrap ">
                {users.map((user, index) => (
                    <UserCard key={index} user={user} onPress={userProfile} />
                ))}

                <View
                    className="bg-zinc-200 opacity-bg-30  
                            rounded-xl mt-3 ml-3 mb-2  p-3 w-1/3 items-center justify-center"
                    style={{ width: 125, height: 205 }}
                >
                    <ImageBackground
                        resizeMode="contain"
                        source={HEART_PLUS}
                        className="my-6 w-24 h-24 items-center"
                    />
                    <Link type="link" href="(tabs)/search-user">
                        <Text className=" mt-4 font-bold align-text-bottom">
                            Add New
                        </Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ShortListPage
