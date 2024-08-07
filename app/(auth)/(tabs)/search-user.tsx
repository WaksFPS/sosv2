import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const SearchUserTab = () => {
    return (
        <>
            <LinearGradient
                colors={['#FDC830', '#F57435']}
                className="h-1/5 flex-col rounded-b-3xl items-center justify-between px-5 pt-10"
            >
                <View className="flex-row items-center justify-between w-full">
                    <TouchableOpacity>
                        <Ionicons name="menu" size={28} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-2xl font-bold">
                        Search
                    </Text>
                    <TouchableOpacity>
                        <Ionicons name="home" size={28} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="flex flex-row items-center mb-5 bg-white rounded-lg px-3">
                    <Ionicons name="search" size={18} color="gray" />
                    <TextInput
                        className="flex flex-1 py-2 text-gray-500 ml-2"
                        placeholder="Search Username"
                    />
                </View>
            </LinearGradient>
            <View className="flex flex-row justify-between mt-4 px-2">
                <LinearGradient
                    colors={['#FDC830', '#F57435']}
                    className="rounded-lg w-32 p-2"
                >
                    <View className="py-2 flex-col items-center">
                        <View className="px-5">
                            <TouchableOpacity>
                                <Ionicons
                                    name="add-circle-outline"
                                    size={32}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                        <View className="px-2 mt-1">
                            <Text className="text-white font-medium">
                                Add Search
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
                <LinearGradient
                    colors={['#FDC830', '#F57435']}
                    className="rounded-lg w-32 p-1"
                >
                    <View className="py-2 flex-col">
                        <View className="items-center px-5">
                            <Text className="text-white font-medium">
                                My Ideal
                            </Text>
                            <Text className="text-white font-medium">
                                338/342
                            </Text>
                        </View>
                        <View className="mt-2 px-2">
                            <TouchableOpacity>
                                <Ionicons
                                    name="create-outline"
                                    size={26}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
                <LinearGradient
                    colors={['#FDC830', '#F57435']}
                    className="rounded-lg w-32 p-1"
                >
                    <View className="py-2 flex-col">
                        <View className="items-center px-2">
                            <Text className="text-white font-medium">
                                Saved Search
                            </Text>
                            <Text className="text-white font-medium">0/0</Text>
                        </View>
                        <View className="flex-row items-center justify-between mt-2 px-2">
                            <TouchableOpacity>
                                <Ionicons
                                    name="create-outline"
                                    size={26}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons
                                    name="trash-outline"
                                    size={26}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </View>
            <View className="flex flex-row justify-between mt-2 px-2">
                <LinearGradient
                    colors={['#FDC830', '#F57435']}
                    className="rounded-lg w-32 p-1"
                >
                    <View className="py-2 flex-col">
                        <View className="items-center px-2">
                            <Text className="text-white font-medium">
                                Saved Search
                            </Text>
                            <Text className="text-white font-medium">0/0</Text>
                        </View>
                        <View className="flex-row items-center justify-between mt-2 px-2">
                            <TouchableOpacity>
                                <Ionicons
                                    name="create-outline"
                                    size={26}
                                    color="white"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons
                                    name="trash-outline"
                                    size={26}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </>
    )
}

export default SearchUserTab
