import React, { useState } from 'react'
import { Dimensions, TouchableOpacity, View, Text } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
export const DashboardSettings = () => {
    const { width } = Dimensions.get('window')
    //for testing of settings icon only
    const [isSoundSelected, setIsSoundSelected] = useState(false)
    const [isNotifSelected, setIsNotifSelected] = useState(false)
    const [isNearMeSelected, setIsNearMeSelected] = useState(false)
    return (
        <>
            <View
                className="flex-row justify-around w-full items-center"
                style={{
                    flex: 1,
                }}
            >
                <View className="items-center">
                    <Text className="text-base mb-3 text-white">Sound</Text>
                    <TouchableOpacity
                        className="items-center justify-center"
                        onPress={() => setIsSoundSelected(!isSoundSelected)}
                    >
                        <MaterialCommunityIcons
                            name={
                                isSoundSelected ? 'volume-high' : 'volume-off'
                            }
                            size={width * 0.12}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
                <View className="items-center">
                    <Text className="text-base mb-3 text-white">
                        Notification
                    </Text>
                    <TouchableOpacity
                        className=" items-center justify-center"
                        onPress={() => setIsNotifSelected(!isNotifSelected)}
                    >
                        <MaterialCommunityIcons
                            name={isNotifSelected ? 'bell' : 'bell-off'}
                            size={width * 0.12}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
                <View className="items-center">
                    <Text className="text-base mb-3 text-white">Near Me</Text>
                    <TouchableOpacity
                        className=" items-center justify-center"
                        onPress={() => setIsNearMeSelected(!isNearMeSelected)}
                    >
                        <MaterialCommunityIcons
                            name={
                                isNearMeSelected
                                    ? 'map-marker'
                                    : 'map-marker-off'
                            }
                            size={width * 0.12}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
