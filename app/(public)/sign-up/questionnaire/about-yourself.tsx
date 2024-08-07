import { BackButton } from '@/components/shared/back-button'
import { Button } from '@/components/shared/button'
import { Input } from '@/components/shared/input'
import TextScalable from '@/components/shared/text-scale'
import { getLookUpByName } from '@/services/endpoints/lookup'
import { updateUserFieldApi } from '@/services/endpoints/user'
import { authAtom } from '@/store/auth'
import { useMutation, useQuery } from '@tanstack/react-query'
import { router, Stack } from 'expo-router'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AboutYourself = () => {
    const auth = useAtomValue(authAtom)
    const [detailsLength, setDetailsLength] = useState<number>(0)
    const [note, SetNote] = useState<string>('')
    const lookUpRelationshipMu = useQuery({
        queryKey: ['lookup', 'relationshipstatus'],
        queryFn: () => getLookUpByName('RELATIONSHIPSTATUS'),
    })

    const updateAboutMu = useMutation({
        mutationFn: () =>
            updateUserFieldApi({
                user_id: auth.user.userId,
                who_updated: auth.user.userId,
                upd_mode: 'USER_ABOUT',
                about: note,
            }),
        onSuccess: () => {
            router.push('sign-up/questionnaire/my-location')
        },
    })

    const handleSubmit = () => {
        updateAboutMu.mutate()
    }

    const handleSkip = () => {
        router.push('sign-up/questionnaire/my-location')
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            contentContainerStyle={{ flex: 1 }}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView className="flex-1 mx-4 items-center justify-between">
                    <Stack.Screen
                        options={{
                            title: 'About yourself',
                            headerStyle: {
                                backgroundColor: 'transparent',
                            },
                            headerTitleStyle: {
                                color: '#F37335',
                                fontSize: 24,
                                fontWeight: 'bold',
                            },
                            headerLeft: () => <BackButton />,
                            headerRight: () => (
                                <TouchableOpacity onPress={handleSkip}>
                                    <Text className="text-background-alt">
                                        Skip
                                    </Text>
                                </TouchableOpacity>
                            ),
                        }}
                    />
                    <View className="flex-1 items-center justify-center">
                        <View>
                            <TextScalable
                                fontSize={24}
                                fontClassname="text-center font-bold text-sos-gray"
                            >
                                Please share something about yourself.
                            </TextScalable>
                        </View>
                        <View>
                            <View className="mt-4 relative h-64">
                                <Input
                                    className="p-4 relative"
                                    containerClassName="h-full justify-start"
                                    multiline
                                    placeholder="Add more information about yourself..."
                                    maxLength={1000}
                                    onChangeText={(details) => {
                                        setDetailsLength(details.length)
                                        SetNote(details)
                                    }}
                                    editable
                                />
                            </View>
                            <TextScalable
                                fontSize={14}
                                fontClassname="text-gray-500 text-right"
                            >
                                {detailsLength}/1000
                            </TextScalable>
                            <TextScalable
                                fontSize={14}
                                fontClassname="text-gray-500 text-center  mt-2"
                            >
                                Please enter a minimum of 50 and a maximum of
                                1,000 characters.
                            </TextScalable>
                        </View>
                    </View>
                    <Button
                        className="w-full"
                        onPress={handleSubmit}
                        isLoading={updateAboutMu.isPending}
                        disabled={
                            updateAboutMu.isPending || !note || note.length < 50
                        }
                    >
                        <Text> Next </Text>
                    </Button>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default AboutYourself
