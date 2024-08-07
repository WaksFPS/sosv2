import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity, View, Text, Alert } from 'react-native'
import { router, Stack } from 'expo-router'
import TextScalable from '@/components/shared/text-scale'
import { Button } from '@/components/shared/button'
import { BackButton } from '@/components/shared/back-button'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getLookUpByName } from '@/services/endpoints/lookup'
import RadioButton from '@/components/shared/radio-button'
import { useState } from 'react'
import { updateUserFieldApi } from '@/services/endpoints/user'
import { authAtom } from '@/store/auth'
import { useAtomValue } from 'jotai'

const MyPrefSmoking = () => {
    const [selected, setSelected] = useState('')
    const lookUpRelationshipMu = useQuery({
        queryKey: ['lookup', 'smoking'],
        queryFn: () => getLookUpByName('SMOKING'),
    })

    const auth = useAtomValue(authAtom)

    const updateAlcoholMu = useMutation({
        mutationFn: () =>
            updateUserFieldApi({
                user_id: auth.user.userId,
                who_updated: auth.user.userId,
                upd_mode: 'USER_PREF_SMOKING',
                pref_smoking: selected,
            }),
        onSuccess: () => {
            router.push('sign-up/personal-questionnaire/my-exercise-regimen')
        },
    })

    const handleSkip = () => {
        router.push('sign-up/personal-questionnaire/my-exercise-regimen')
    }

    const handleSubmit = () => {
        updateAlcoholMu.mutate()
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
                    title: 'Personal Details (8/16)',
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
                        My Smoking
                    </TextScalable>
                </View>
                <View className="justify-center">
                    {lookUpRelationshipMu.data.lookUp.map((item, index) => (
                        <RadioButton
                            key={index}
                            label={item.description}
                            onPress={() => setSelected(item.code)}
                            selected={selected === item.code}
                            buttonInnerColor="bg-background-alt"
                        />
                    ))}
                </View>
            </View>
            <View className="w-full">
                <Button
                    onPress={handleSubmit}
                    isLoading={updateAlcoholMu.isPending}
                    disabled={updateAlcoholMu.isPending || !selected}
                >
                    Next
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default MyPrefSmoking
