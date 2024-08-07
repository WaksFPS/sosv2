import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { REFER_A_FRIEND } from '@/dictionary/images'
import { Button } from '@/components/shared/button'
import * as Clipboard from 'expo-clipboard'

interface data {
    trialLeft: number
    referralCode: string
}
const data: data = {
    trialLeft: 3,
    referralCode: '123456',
}

const index = () => {
    const [referralCode, setReferralCode] = useState<string>('')

    useEffect(() => {
        setReferralCode(data.referralCode)
    }, [])

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(referralCode)
        console.log('Copied to Clipboard')
    }

    return (
        <View className="flex-1 items-center">
            <Image source={REFER_A_FRIEND} />
            <Text className="text-xl text-center mt-5">
                {data.trialLeft} Months of Free Trial Left
            </Text>
            <Text className="text-xl font-bold text-center mt-5 p-3">
                Click Share or Copy the code below to get (1) month of Free
                Service for each new friend that signs-up for S.O.Search!
            </Text>
            <Text className="text-lg font-bold text-start mt-5 w-3/4 pt-3">
                Your Referral Code is :
            </Text>

            <View
                className="flex justify-between flex-row bg-red-50 mx-5 w-3/4 px-5 py-3"
                style={{
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: 'red',
                    borderRadius: 10,
                }}
            >
                <Text className="text-lg font-bold text-center ">
                    {data.referralCode}
                </Text>
                <Text
                    className="text-lg font-bold text-center text-orange-500"
                    onPress={copyToClipboard}
                >
                    Copy
                </Text>
            </View>
            <Button className="w-1/2 mt-10">Share</Button>
        </View>
    )
}

export default index
