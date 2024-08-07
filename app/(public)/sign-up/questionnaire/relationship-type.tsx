import { Button } from '@/components/shared/button'
import RadioButton from '@/components/shared/radio-button'
import { getLookUpByName } from '@/services/endpoints/lookup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { router, Stack } from 'expo-router'
import { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BackButton } from '@/components/shared/back-button'
import { updateUserFieldApi } from '@/services/endpoints/user'
import { authAtom } from '@/store/auth'
import { useAtomValue } from 'jotai'

const RelationshipType = () => {
    const auth = useAtomValue(authAtom)
    const [selected, setSelected] = useState<string>('')
    const lookUpRelationshipMu = useQuery({
        queryKey: ['lookup', 'relationshiptype'],
        queryFn: () => getLookUpByName('RELATIONSHIPTYPE'),
    })

    const updateRelTypeMu = useMutation({
        mutationFn: () =>
            updateUserFieldApi({
                user_id: auth.user.userId,
                who_updated: auth.user.userId,
                upd_mode: 'USER_RELATIONSHIP_TYPE',
                relationship_type: selected,
            }),
        onSuccess: () => {
            router.push('sign-up/questionnaire/gender')
        },
    })

    const handleSubmit = () => {
        updateRelTypeMu.mutate()
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
                    title: 'Looking for what?',
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
            <View>
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
            <Button
                className="w-full"
                onPress={handleSubmit}
                isLoading={updateRelTypeMu.isPending}
                disabled={!selected || updateRelTypeMu.isPending}
            >
                <Text> Next </Text>
            </Button>
        </SafeAreaView>
    )
}

export default RelationshipType
