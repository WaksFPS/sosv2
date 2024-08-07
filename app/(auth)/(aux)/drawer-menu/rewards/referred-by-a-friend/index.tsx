import React from 'react'
import { View, Text, Image } from 'react-native'
import { REFERRED_BY_A_FRIEND } from '@/dictionary/images'
import { Input } from '@/components/shared/input'
import { Button } from '@/components/shared/button'

const index = ({}) => {
    return (
        <View className="flex-1 items-center">
            <Image source={REFERRED_BY_A_FRIEND} />
            <Text className="text-xl text-center mt-5 font-bold">
                Enter friends referral code below to claim (1) month of Free
                service
            </Text>
            <Input
                containerClassName="mt-10 w-40 w-3/4"
                inputClassName="text-center"
                placeholder="Friend's Referral Code"
            />

            <Button className="w-1/2 mt-5" disabled={false}>
                Share
            </Button>
        </View>
    )
}

export default index
