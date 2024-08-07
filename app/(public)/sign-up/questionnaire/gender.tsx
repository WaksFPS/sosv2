import { Button } from '@/components/shared/button'
import RadioButton from '@/components/shared/radio-button'
import { getLookUpByName } from '@/services/endpoints/lookup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { router, Stack } from 'expo-router'
import { useState } from 'react'
import { View, Text, Alert, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackButton } from '@/components/shared/back-button'
import {
    GENDER_FEMALE,
    GENDER_FEMALE_SELECTED,
    GENDER_MALE,
    GENDER_MALE_SELECTED,
} from '@/dictionary/images'
import TextScalable from '@/components/shared/text-scale'
import { cn } from '@/lib/util'
import { updateUserFieldApi } from '@/services/endpoints/user'
import { authAtom } from '@/store/auth'
import { useAtomValue } from 'jotai'

const LookingForGender = () => {
    const auth = useAtomValue(authAtom)
    const [selected, setSelected] = useState<string>('')

    const updateGenderMu = useMutation({
        mutationFn: () =>
            updateUserFieldApi({
                user_id: auth.user.userId,
                who_updated: auth.user.userId,
                upd_mode: 'USER_LOOKING_FOR_GENDER',
                looking_for_gender: selected,
            }),
        onSuccess: () => {
            router.push('sign-up/questionnaire/about-yourself')
        },
    })

    const handleSubmit = () => {
        updateGenderMu.mutate()
    }

    return (
        <SafeAreaView className="flex-1 mx-4 items-center justify-between">
            <Stack.Screen
                options={{
                    title: 'Looking for who?',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: '#F37335',
                        fontSize: 24,
                        fontWeight: 'bold',
                    },
                    headerLeft: () => <BackButton />,
                }}
            />
            {/* Extra view for placing of screens */}
            <View />
            <View className="flex-row">
                <RenderGenderOptions
                    gender="MAL"
                    setSelectedGender={setSelected}
                    isSelected={selected === 'MAL'}
                />
                <View className="h-full bg-[#707070]" style={{ width: 1 }} />
                <RenderGenderOptions
                    gender="FEM"
                    setSelectedGender={setSelected}
                    isSelected={selected === 'FEM'}
                />
            </View>
            <Button
                className="w-full"
                onPress={handleSubmit}
                isLoading={updateGenderMu.isPending}
                disabled={updateGenderMu.isPending || !selected}
            >
                <Text> Next </Text>
            </Button>
        </SafeAreaView>
    )
}

interface RenderGenderProps {
    gender: string
    setSelectedGender: React.Dispatch<React.SetStateAction<string>>
    isSelected: boolean
}
const RenderGenderOptions: React.FC<RenderGenderProps> = (props) => {
    const { gender, setSelectedGender, isSelected } = props
    const genderDesc = gender === 'MAL' ? 'Man' : 'Woman'
    let genderImgName = gender === 'FEM' ? GENDER_FEMALE : GENDER_MALE

    if (isSelected) {
        genderImgName =
            gender === 'FEM' ? GENDER_FEMALE_SELECTED : GENDER_MALE_SELECTED
    }

    return (
        <>
            <TouchableOpacity
                className="items-center flex-1 justify-center"
                onPress={() => setSelectedGender(gender)}
            >
                <Image
                    source={genderImgName}
                    className={cn('w-48 h-52', isSelected && 'w-60 h-64')}
                    resizeMode="contain"
                />
                <TextScalable
                    fontSize={20}
                    fontClassname="font-semibold text-sos-gray mt-5"
                >
                    {genderDesc}
                </TextScalable>
            </TouchableOpacity>
        </>
    )
}

export default LookingForGender
