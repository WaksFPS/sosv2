import { Stack } from 'expo-router'
import React from 'react'
import { Footer } from '@/components/shared/footer'
import GradientHeader from '../../../../../components/shared/header-gradient'
import { Spinner } from '@/components/shared/spinner'
import { useAtomValue } from 'jotai'
import { spinnerStatusAtom } from '@/store/user'
import { HeaderRightIcon } from '@/components/shared/header-right-icon'
const MyAccountLayout = () => {
    const spinnerStatus = useAtomValue(spinnerStatusAtom)
    return (
        <>
            <Spinner visible={spinnerStatus} />
            <Stack
                screenOptions={{
                    headerLeft: () => <></>,
                    headerBackground: () => <GradientHeader />,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 20,
                    },
                    headerRight: () => <HeaderRightIcon iconName="home" />,
                    title: 'My Account',
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="change-password/index" />
                <Stack.Screen name="modify-subscription/index" />
                <Stack.Screen
                    name="modify-subscription/unsubscribe/confirmation/index"
                    options={{
                        title: 'End Subscription Plan',
                    }}
                />
                <Stack.Screen
                    name="modify-subscription/unsubscribe/verify-code/index"
                    options={{
                        title: 'End Subscription Plan',
                        headerRight: () => <></>,
                    }}
                />
                <Stack.Screen
                    name="modify-subscription/unsubscribe/subscription-ended/index"
                    options={{
                        title: 'End Subscription Plan',
                        headerRight: () => <></>,
                    }}
                />
            </Stack>
            <Footer />
        </>
    )
}

export default MyAccountLayout
