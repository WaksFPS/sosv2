import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity, View, Text, Alert, ScrollView } from 'react-native'
import { router, Stack } from 'expo-router'
import TextScalable from '@/components/shared/text-scale'
import { Button } from '@/components/shared/button'
import { BackButton } from '@/components/shared/back-button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getLookUpByName } from '@/services/endpoints/lookup'
import { useState } from 'react'
import Checkbox from '@/components/shared/checkbox'
import { updateUserFieldApi } from '@/services/endpoints/user'
import { authAtom } from '@/store/auth'
import { useAtomValue } from 'jotai'

const MyHobbies = () => {
    const [selected, setSelected] = useState<string[]>([])
    const lookUpRelationshipMu = useQuery({
        queryKey: ['lookup', 'hobbies'],
        queryFn: () => getLookUpByName('HOBBY'),
    })

    const auth = useAtomValue(authAtom)

    const updateHobbiesMu = useMutation({
        mutationFn: () =>
            updateUserFieldApi({
                user_id: auth.user.userId,
                who_updated: auth.user.userId,
                upd_mode: 'USER_HOBBY',
                hobby_code: selected.join(','),
            }),
        onSuccess: () => {
            router.push('sign-up/personal-questionnaire/complete-final-profile')
        },
    })

    const handleSubmit = () => {
        updateHobbiesMu.mutate()
    }

    const handleOnCheck = (value: string) => {
        if (selected.includes(value)) {
            setSelected(selected.filter((item) => item !== value))
        } else {
            setSelected([...selected, value])
        }
    }

    const handleSkip = () => {
        router.push('sign-up/personal-questionnaire/complete-final-profile')
    }

    if (lookUpRelationshipMu.isLoading) {
        return <Text> Loading </Text>
    }

    if (!lookUpRelationshipMu.data) {
        Alert.alert('No data')
        router.back()
        return
    }

    return (
        <SafeAreaView className="flex-1 mx-4 items-center justify-between">
            <Stack.Screen
                options={{
                    title: 'Personal Details (16/16)',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: '#F37335',
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                    headerLeft: () => <BackButton />,
                    headerRight: () => (
                        <TouchableOpacity onPress={handleSkip}>
                            <Text className="text-background-alt text-lg">
                                Skip
                            </Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <View className="flex-1 items-center justify-center space-y-10">
                <View>
                    <TextScalable
                        fontSize={32}
                        fontClassname="text-sos-gray font-bold"
                    >
                        HOBBIES
                    </TextScalable>
                </View>
                <ScrollView
                    className="w-3/4"
                    contentContainerStyle={{
                        justifyContent: 'center',
                        rowGap: 10,
                    }}
                >
                    {lookUpRelationshipMu.data.lookUp.map((item, index) => (
                        <View className="flex-row">
                            <Checkbox
                                key={index}
                                setIsChecked={() =>
                                    selected.includes(item.code)
                                }
                                isChecked={selected.includes(item.code)}
                                onPress={() => handleOnCheck(item.code)}
                            />
                            <TextScalable fontSize={14}>
                                {item.description}
                            </TextScalable>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View className="w-full">
                <Button
                    onPress={handleSubmit}
                    isLoading={updateHobbiesMu.isPending}
                    disabled={updateHobbiesMu.isPending || !selected.length}
                >
                    Next
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default MyHobbies
