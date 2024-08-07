import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { userDataAtom } from '@/store/user'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { LinearGradient } from 'expo-linear-gradient'
import { useAtomValue } from 'jotai'
import Avatar from '@/components/shared/avatar'
import TextScalable from '@/components/shared/text-scale'
import { Footer } from '@/components/shared/footer'

const MyProfile = () => {
    const userData = useAtomValue(userDataAtom)
    const { user, userField } = userData

    interface Data {
        title: string
        icon: any
        value: string
    }

    const data: Data[] = [
        {
            title: 'My Location',
            icon: 'map-marker',
            value:
                userField.address?.city && userField.address?.country
                    ? `${userField.address.city}, ${userField.address.country}`
                    : '',
        },
        {
            title: 'My Status',
            icon: 'account-question',
            value: userField.userPreference.relationshipStatus ?? '',
        },
        {
            title: 'Looking for what?',
            icon: 'account-search',
            value: userField.userPreference.relationshipType ?? '',
        },
        {
            title: 'Looking for who?',
            icon: 'human-male-female',
            value: userField.userPreference.lookingForGender ?? '',
        },
        {
            title: 'About Me',
            icon: 'book-open',
            value: userField.about ?? '',
        },
        {
            title: 'My Height',
            icon: 'human-male-height',
            value: userField.userPreference.height ?? '',
        },
        {
            title: 'My Body Type',
            icon: 'human',
            value: userField.userPreference.bodyType ?? '',
        },
        {
            title: 'My Hair Color',
            icon: 'hair-dryer',
            value: userField.userPreference.hairColor ?? '',
        },
        {
            title: 'My Eye Color',
            icon: 'eye',
            value: userField.userPreference.eyeColor ?? '',
        },
        {
            title: 'My Kids Situation',
            icon: 'baby',
            value: userField.userPreference.kidSituation ?? '',
        },
        {
            title: 'My Education Level',
            icon: 'school',
            value: userField.userPreference.educLevel ?? '',
        },
        {
            title: 'My Alcohol Intake',
            icon: 'beer',
            value: userField.userPreference.prefAlcohol ?? '',
        },
        {
            title: 'My Smoking Frequency',
            icon: 'smoking',
            value: userField.userPreference.prefSmoking ?? '',
        },
        {
            title: 'My Exercise Regimen',
            icon: 'dumbbell',
            value: userField.userPreference.exerRegimen ?? '',
        },
        {
            title: 'My Ethnicity',
            icon: 'account-group',
            value: userField.userPreference.ethnicity ?? '',
        },
        {
            title: 'My Faith',
            icon: 'church',
            value: userField.userPreference.religBelief ?? '',
        },
        {
            title: 'My Languages',
            icon: 'earth',
            value: userField.userPreference.languageCode?.length
                ? userField.userPreference.languageCode.join(', ')
                : '',
        },
        {
            title: 'My Profession',
            icon: 'briefcase',
            value: userField.userPreference.profession ?? '',
        },
        {
            title: 'My Pet Policy',
            icon: 'dog',
            value: userField.userPreference.petPolicy ?? '',
        },
        {
            title: 'My Politics',
            icon: 'vote',
            value: userField.userPreference.posPolitics ?? '',
        },
        {
            title: 'My Hometown',
            icon: 'home-city',
            value:
                userField.hometown.city && userField.hometown.country
                    ? `${userField.hometown.city}, ${userField.hometown.country}`
                    : '',
        },
        {
            title: 'My Hobbies',
            icon: 'guitar-electric',
            value: userField.userPreference.hobbyCode?.length
                ? userField.userPreference.hobbyCode.join(', ')
                : '',
        },
    ]

    return (
        <View className="flex-1 align-center">
            <LinearGradient
                colors={['#FDC830', '#F57435']}
                className="p-2 h-2/5"
            >
                <SafeAreaView>
                    <View className="flex-row mb-2 ml-8">
                        <Text className="mx-auto color-white font-bold text-xl">
                            My Profile
                        </Text>
                        <TouchableOpacity>
                            <Ionicons name="home" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                <View className="items-center justify-center">
                    <Avatar
                        uri={user.mediaProfile}
                        imageClassName="mt-4 h-40 w-40"
                    />
                    <TextScalable
                        fontClassname="mx-auto color-white font-bold mt-3"
                        fontSize={24}
                        children={`${user.firstName} ${user.lastName}`}
                    />
                    <TextScalable
                        fontClassname="mx-auto color-white font-normal"
                        fontSize={18}
                        children={`${user.age} years old`}
                    />
                </View>
            </LinearGradient>
            <ScrollView className="mb-15">
                {data.map((item, index) => (
                    <View
                        key={index}
                        className="flex-row items-center p-3 border-b border-b-slate-300"
                    >
                        <MaterialCommunityIcons
                            size={32}
                            name={item.icon}
                            color="#F57435"
                        />
                        <View className="pl-3">
                            <TextScalable
                                fontClassname="font-normal text-lg text-gray-600"
                                fontSize={16}
                            >
                                {item.title}
                            </TextScalable>
                            {item.value ? (
                                <TextScalable
                                    fontClassname="font-normal text-base text-orange-500"
                                    fontSize={14}
                                    children={item.value}
                                />
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        // add functionality here
                                        !item.value &&
                                            console.log(
                                                `${item.title} clicked!`,
                                            )
                                    }}
                                >
                                    <TextScalable
                                        fontClassname="font-normal text-base text-orange-500"
                                        fontSize={14}
                                    >
                                        Add
                                    </TextScalable>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>
            <Footer />
        </View>
    )
}

export default MyProfile
