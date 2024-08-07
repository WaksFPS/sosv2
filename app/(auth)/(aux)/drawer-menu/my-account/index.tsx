import { View, TouchableOpacity, Dimensions } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Footer } from '@/components/shared/footer'
import { router } from 'expo-router'
import TextScalable from '@/components/shared/text-scale'

const MyAccountPage = () => {
    const { width } = Dimensions.get('window')
    const myAccountSettings = [
        {
            title: 'Change My Password',
            path: '(aux)/drawer-menu/my-account/change-password',
        },
        {
            title: 'Update My Email Address',
            path: '(aux)/drawer-menu/my-account/change-email',
        },
        {
            title: 'Update My Mobile Number',
            path: '(aux)/drawer-menu/my-account/change-mobile-number',
        },
        {
            title: 'Modify My Subscription',
            path: '(aux)/drawer-menu/my-account/modify-subscription',
        },
    ]
    return (
        <>
            <View className="flex-1 align-center">
                <View className="px-2">
                    {myAccountSettings.map((value, index) => (
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
                            className="px-5 py-3 my-1.5 bg-white rounded-xl flex flex-row items-center justify-between"
                            onPress={() => router.push(`${value.path}`)}
                            key={index}
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
                </View>
                <Footer />
            </View>
        </>
    )
}

export default MyAccountPage
