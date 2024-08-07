import { ImageBackground, Image, Text, View } from 'react-native'
import { Link } from '@/components/shared/link'
import { MAGNIFYING_COUPLE, WELCOME_BACKGROUND } from '@/dictionary/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthenticate } from '@/hooks/useAuthenticate'
import { useFocusEffect, useRouter } from 'expo-router'

export const Page = () => {
    const router = useRouter()
    const auth = useAuthenticate()

    useFocusEffect(() => {
        if (auth.isAuthenticated) {
            router.replace('/dashboard')
        }
    })

    return (
        <SafeAreaView className="h-full">
            <ImageBackground source={WELCOME_BACKGROUND} className="flex-1">
                <View className="flex-1 justify-center items-center">
                    <View>
                        <Text className="text-white text-6xl font-bold text-center">
                            Welcome to Significant Other Search!
                        </Text>
                        <View className="items-center justify-center">
                            <Image
                                source={MAGNIFYING_COUPLE}
                                className="bg-contain w-48 h-48"
                            />
                        </View>
                    </View>
                    <View className="px-2.5">
                        <Text className="text-gray-600 text-xl text-center">
                            Let's start your journey by taking a few minutes to
                            set up your account.
                        </Text>
                        <Link
                            href="/sign-up/legal-confirmation-screen"
                            textClassName="font-bold text-lg"
                        >
                            Next
                        </Link>
                        <Text className="text-gray-600 text-center text-xl">
                            Already have an account?
                        </Text>
                        <Link
                            type="link"
                            href="(public)/sign-in"
                            textClassName="font-bold text-4xl"
                            buttonClassName="mt-5 text-center"
                        >
                            Login now!
                        </Link>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Page
