import React, { FC } from 'react'
import { View, Text, Image, ImageSourcePropType } from 'react-native'

interface EmptyHandlerProps {
    title: string
    description: string
    image: ImageSourcePropType
}

const EmptyHandler: FC<EmptyHandlerProps> = ({ title, description, image }) => {
    return (
        <View className="flex-1 justify-center items-center">
            <Image
                source={image}
                className="bg-contain w-48 h-48 mx-auto mb-2"
            />
            <Text className="text-center text-gray-500 text-xl">{title}</Text>
            <Text className="text-center text-gray-500 text-md">
                {description}
            </Text>
        </View>
    )
}

export default EmptyHandler
