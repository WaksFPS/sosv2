import { Button } from '@/components/shared/button'
import RadioButton from '@/components/shared/radio-button'
import { getLookUpByName } from '@/services/endpoints/lookup'
import { updateUserFieldApi } from '@/services/endpoints/user'
import { authAtom } from '@/store/auth'
import { useMutation, useQuery } from '@tanstack/react-query'
import { router, Stack } from 'expo-router'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const MyStatus = () => {
    const auth = useAtomValue(authAtom)
    const [selected, setSelected] = useState<string>('')

    const lookUpRelationshipMu = useQuery({
        queryKey: ['lookup', 'relationshipstatus'],
        queryFn: () => getLookUpByName('RELATIONSHIPSTATUS'),
    })

    const updateRelStatusMu = useMutation({
        mutationFn: () =>
            updateUserFieldApi({
                user_id: auth.user.userId,
                who_updated: auth.user.userId,
                upd_mode: 'USER_RELATIONSHIP_STATUS',
                relationship_status: selected,
            }),
        onSuccess: () => {
            router.push('sign-up/questionnaire/relationship-type')
        },
    })

    const handleSubmit = () => {
        updateRelStatusMu.mutate()
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
                    title: 'My Status',
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                    headerTitleStyle: {
                        color: '#F37335',
                        fontSize: 24,
                        fontWeight: 'bold',
                    },
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
                isLoading={updateRelStatusMu.isPending}
                disabled={!selected || updateRelStatusMu.isPending}
            >
                <Text> Next </Text>
            </Button>
        </SafeAreaView>
    )
}

export default MyStatus
