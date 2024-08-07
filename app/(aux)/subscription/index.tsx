import { Button } from '@/components/shared/button'
import TextScalable from '@/components/shared/text-scale'
import { cn } from '@/lib/util'
import { LinearGradient } from 'expo-linear-gradient'
import { router, Stack } from 'expo-router'
import { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useSetAtom } from 'jotai'
import { authAtom } from '@/store/auth'
import { updateUserFieldApi } from '@/services/endpoints/user'

const plans = [
    {
        code: 'REG',
        title: 'Regular',
        price: 0,
        description: 'Enjoy S.O.Search for free',
        longDescription: `They say life is a journey. Join S.O.Search today and manage your dating along the way. \n\nBuild your profile, define who you are looking for and let the app help find your Significant Other.`,
    },
    {
        code: 'PRV',
        title: 'Privacy Plan',
        price: 249,
        description: 'Subscription auto-renews after one year',
        longDescription:
            'Your S.O.Search profile is visible to all users, including while using Near Me, but your pictures remain hidden until you initiate a chat conversation with another user. Only then are your pictures made available to that user. Privacy Members can change their viewable status by switching between Regular and Privacy at any time.',
    },
    {
        code: 'ELT',
        title: 'Elite Plan',
        price: 495,
        description: 'Subscription auto-renews after one year',
        longDescription:
            'Your S.O.Search profile is hidden to all but Elite membership users, including while using Near Me. Elite Members can see your profile, but your pictures remain hidden until you initiate a Chat conversation with another Elite Member. Elite Member users are identified with a Diamond next to their UserName. Elite Members can also view and communicate with Regular and Privacy Members users. Elite members can change their viewable status by switching between Regular, Privacy and Elite levels at anytime.',
    },
]

const Subscription = () => {
    const setAuth = useSetAtom(authAtom)
    const [selected, setSelected] = useState(plans[0].code)
    const { top, bottom } = useSafeAreaInsets()

    const handleSubmit = () => {
        if (selected === 'REG') {
            setAuth((prev) => ({
                ...prev,
                authenticated: true,
            }))
            router.replace('dashboard')
        }
    }
    return (
        <View
            className="flex-1 justify-between mx-4"
            style={{ paddingTop: 20, paddingBottom: bottom }}
        >
            <Stack.Screen
                options={{
                    header: () => {
                        return (
                            <LinearGradient
                                colors={['#F37335', '#FDC830']}
                                start={[0, 1]}
                                end={[0, 0]}
                                style={{
                                    paddingTop: top,
                                    paddingBottom: 10,
                                    paddingHorizontal: 20,
                                    alignItems: 'center',
                                }}
                            >
                                <TextScalable
                                    fontSize={20}
                                    fontClassname="text-white font-bold"
                                >
                                    Subscription Plan
                                </TextScalable>
                            </LinearGradient>
                        )
                    },
                }}
            />
            <View className="items-center justify-center">
                <View className="flex-row items-center justify-center">
                    {plans.map((item, index) => (
                        <TouchableOpacity
                            className={cn(
                                'px-6 py-2 border border-gray-300',
                                index === 0 && 'rounded-l-lg',
                                index === 2 && 'rounded-r-lg',
                                selected === item.code && 'bg-background-alt',
                            )}
                            onPress={() => setSelected(item.code)}
                        >
                            <TextScalable
                                fontSize={12}
                                fontClassname={cn(
                                    'text-background-alt',
                                    selected === item.code && 'text-white',
                                )}
                            >
                                {item.title}
                            </TextScalable>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className="items-center space-y-10 mt-6">
                    <View
                        className="flex-row items-center space-x-4"
                        style={{ columnGap: 14 }}
                    >
                        <TextScalable
                            fontSize={34}
                            fontClassname="text-background-alt"
                        >
                            {plans.find((item) => item.code === selected)
                                ?.price === 0
                                ? 'Free!'
                                : null}
                            {plans.find((item) => item.code === selected)
                                ?.price !== 0 &&
                                `$${plans.find((item) => item.code === selected)?.price}`}
                        </TextScalable>
                        {plans.find((item) => item.code === selected)?.price !==
                            0 && (
                            <TextScalable
                                fontSize={18}
                                fontClassname="text-sos-gray"
                            >
                                per year
                            </TextScalable>
                        )}
                    </View>
                    <View className="mx-10">
                        <TextScalable
                            fontSize={18}
                            fontClassname="text-sos-gray"
                        >
                            {
                                plans.find((item) => item.code === selected)
                                    ?.description
                            }
                        </TextScalable>
                    </View>
                    <View className="mx-10">
                        <TextScalable
                            fontSize={18}
                            fontClassname="text-sos-gray"
                        >
                            {
                                plans.find((item) => item.code === selected)
                                    ?.longDescription
                            }
                        </TextScalable>
                    </View>
                </View>
            </View>
            <View className="w-full">
                <Button
                    onPress={handleSubmit}
                    textClassName="text-lg font-bold"
                >
                    Select
                </Button>
            </View>
        </View>
    )
}

export default Subscription
