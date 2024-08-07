import { Button } from '@/components/shared/button'
import TextScalable from '@/components/shared/text-scale'
import { SMARTPHONE_WITH_SAD_FACE } from '@/dictionary/images'
import { sendOTPApi } from '@/services/endpoints/user'
import { SendOTPType } from '@/services/endpoints/user/schema'
import { spinnerStatusAtom } from '@/store/user'
import { useMutation } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useSetAtom } from 'jotai'
import React from 'react'
import { View, Image, Dimensions, Alert } from 'react-native'

const UnsubscribeConfirmationPage = () => {
    const { width } = Dimensions.get('window')
    const { user_id, phone_number } = useLocalSearchParams<{
        user_id: string
        phone_number: string
    }>()
    const setSpinnerStatus = useSetAtom(spinnerStatusAtom)
    const sendOTPMutation = useMutation({
        mutationFn: (data: SendOTPType) => sendOTPApi(data),
        onSuccess: () => {
            router.push({
                pathname:
                    '(aux)/drawer-menu/my-account/modify-subscription/unsubscribe/verify-code',
                params: {
                    user_id: user_id,
                    phone_number: phone_number,
                },
            })
        },
        onError: () => Alert.alert('Error', 'Something went wrong.'),
        onSettled: () => setSpinnerStatus(false),
    })
    const handleConfirm = () => {
        setSpinnerStatus(true)
        if (user_id && phone_number) {
            sendOTPMutation.mutate({
                user_id: parseInt(user_id, 10),
                phone_no: phone_number,
            })
        }
    }
    return (
        <>
            <View className="flex-1 px-2">
                <View className="pt-20 px-5 justify-center align-items items-center">
                    <Image
                        source={SMARTPHONE_WITH_SAD_FACE}
                        resizeMode="contain"
                        className="m-5"
                    />
                    <TextScalable
                        fontSize={18}
                        fontClassname="text-center text-secondary-gray pb-5"
                    >
                        We are sorry to see you go, but we hope it is for all
                        the right reasons!
                    </TextScalable>
                    <TextScalable
                        fontSize={18}
                        fontClassname="text-center text-secondary-gray"
                    >
                        By confirming below, your account will be closed, and
                        all personally identifiable information will be deleted
                        including chats, pictures, and payment information.
                    </TextScalable>
                    <TextScalable
                        fontSize={18}
                        fontClassname="text-center text-secondary-gray"
                    >
                        You will be starting over if you re-join S.O.Search in
                        the future.
                    </TextScalable>
                    <TextScalable
                        fontSize={18}
                        fontClassname="text-center text-secondary-gray pb-5"
                    >
                        If you would still like to proceed, please confirm
                        below.
                    </TextScalable>
                    <Button
                        onPress={handleConfirm}
                        textClassName="text-xl"
                        buttonClassName="rounded-3xl mb-[20%]"
                        gradientColors={['#F37335', '#F37335']}
                        style={{
                            width: width * 0.58,
                        }}
                    >
                        Confirm
                    </Button>
                </View>
            </View>
        </>
    )
}

export default UnsubscribeConfirmationPage
