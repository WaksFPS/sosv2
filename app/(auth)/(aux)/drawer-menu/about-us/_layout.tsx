import { Footer } from '@/components/shared/footer'
import GradientHeader from '@/components/shared/header-gradient'
import { HeaderRightIcon } from '@/components/shared/header-right-icon'

import { Stack } from 'expo-router'

const AboutUsLayout = () => {
    return (
        <>
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
                    title: 'About Us',
                }}
            >
                <Stack.Screen name="index" />
            </Stack>
            <Footer />
        </>
    )
}

export default AboutUsLayout
