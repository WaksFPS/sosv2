import { Button } from '@/components/shared/button'
import TextScalable from '@/components/shared/text-scale'
import { SAD_FACE } from '@/dictionary/images'
import { router } from 'expo-router'
import React from 'react'
import { View, Image, Dimensions } from 'react-native'

const SubscriptionEndedPage = () => {
    const { width } = Dimensions.get('window')
    return (
        <>
            <View className="flex-1 px-2">
                <View className="pt-[60%] px-5 justify-center align-items items-center">
                    <Image
                        source={SAD_FACE}
                        resizeMode="contain"
                        className="m-5"
                    />
                    <TextScalable
                        fontSize={18}
                        fontClassname="text-[#707070] text-center"
                    >
                        You have ended your current subscription plan.
                    </TextScalable>
                </View>
            </View>
            <View className="self-center">
                <Button
                    onPress={() => router.replace('/')}
                    textClassName="text-xl"
                    buttonClassName="rounded-3xl mb-[20%]"
                    gradientColors={['#F37335', '#F37335']}
                    style={{
                        width: width * 0.58,
                    }}
                >
                    Proceed
                </Button>
            </View>
        </>
    )
}

export default SubscriptionEndedPage
