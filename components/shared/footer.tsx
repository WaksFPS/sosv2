import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
export const Footer = () => {
    return (
        <>
            <View className=" h-16" />
            <View className="absolute bottom-0 left-0 right-0 h-16 border-t-[#e7e7e7] bg-[#f8f8f8] items-start ">
                <TouchableOpacity
                    className="ml-3 mt-2.5"
                    onPress={() => router.back()}
                >
                    <MaterialCommunityIcons
                        size={34}
                        name="arrow-left"
                        color="#737373"
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}
