import React from 'react'
import { View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { router } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { SOS_LOGO } from '@/dictionary/images'
import TextScalable from '@/components/shared/text-scale'

const AboutUsPage = () => {
    const { width } = Dimensions.get('window')
    const version = require('package.json').version
    const AboutUsMenu = [
        {
            title: 'Terms & Conditions',
            path: '(aux)/terms-and-condition',
        },
        {
            title: 'Privacy Policy',
            path: '(aux)/privacy-policy',
        },
    ]

    return (
        <>
            <View className="flex-1 align-center">
                <View className="px-2 pt-2">
                    {AboutUsMenu.map((value, index) => (
                        <TouchableOpacity
                            style={{
                                elevation: 5,
                                shadowOffset: {
                                    height: 2,
                                    width: 2,
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                            }}
                            className="px-5 py-5 my-1.5 bg-white rounded-xl flex flex-row items-center justify-between"
                            onPress={() => router.push(`${value.path}`)}
                        >
                            <TextScalable
                                fontSize={19}
                                fontClassname="text-xl text-gray-500 capitalize"
                            >
                                {value.title}
                            </TextScalable>
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={width * 0.07}
                                color="#F37335"
                            />
                        </TouchableOpacity>
                    ))}

                    <View className="mt-10">
                        <TextScalable
                            fontSize={22}
                            fontClassname="font-bold text-lg p-2 text-center text-[#707070]"
                        >
                            S.O.Search
                        </TextScalable>
                        <Image
                            source={SOS_LOGO}
                            className="mx-auto rounded-3xl h-[35vw] my-1 w-[35vw]"
                        />
                        <TextScalable
                            fontSize={22}
                            fontClassname="font-bold text-lg p-2 text-center text-[#707070]"
                        >
                            v{version} (beta)
                        </TextScalable>
                    </View>
                </View>
            </View>
        </>
    )
}

export default AboutUsPage
