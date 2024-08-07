import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import RNPickerSelect from 'react-native-picker-select'
import { Input } from '@/components/shared/input'
import { Button } from '@/components/shared/button'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const ReportIssuePage: React.FC = () => {
    const ReportIssueSchema = z.object({
        issue: z.string(),
        message: z.string().max(1000),
    })

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ReportIssueSchema),
    })

    const [detailLength, setDetailsLength] = useState(0)
    const [selectedIssue, setSelectedIssue] = useState('')

    const onSubmit = (data: any) => {
        console.log(data)
    }

    const pickerStyle = {
        inputIOS: {
            borderWidth: 2,
            borderColor: 'black',
            backgroundColor: 'white',
            borderRadius: 10,
        },
        inputAndroid: {
            borderWidth: 2,
            borderColor: 'black',
            backgroundColor: 'white',
            borderRadius: 10,
        },
        placeholder: {
            color: 'gray',
        },
    }

    const issuePlaceholder = () => {
        if (detailLength === 0) {
            switch (selectedIssue) {
                case 'issue1':
                    return 'Please describe the issue.'
                case 'issue2':
                    return 'Please describe the issue.'
                case 'issue3':
                    return 'Tell us the feature you want S.O.Search to have.'
                case 'issue4':
                    return 'Please describe the issue..'
                case 'issue5':
                    return 'Please describe the issue..'
                default:
                    return 'Please describe the issue.'
            }
        } else {
            return ''
        }
    }

    return (
        <View className="flex-1 align-center">
            <LinearGradient colors={['#FDC830', '#F57435']} className="p-2 ">
                <SafeAreaView>
                    <View className="flex-row mb-2 ml-8">
                        <Text className="mx-auto color-white font-bold text-xl">
                            Report Issues
                        </Text>

                        <TouchableOpacity>
                            <Ionicons name="home" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <View className="flex-1 m-2">
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <RNPickerSelect
                            onValueChange={(value) => {
                                onChange(value)
                                setSelectedIssue(value)
                            }}
                            value={value}
                            items={[
                                { label: 'Abusive Language', value: 'issue1' },
                                {
                                    label: 'Profile Misrepresentation',
                                    value: 'issue2',
                                },
                                { label: 'Feature Request', value: 'issue3' },
                                { label: 'Technical Issue', value: 'issue4' },
                                { label: 'Billing', value: 'issue5' },
                            ]}
                            style={pickerStyle}
                        />
                    )}
                    name="issue"
                    rules={{ required: 'Please select an issue' }}
                />
                {errors.issue && typeof errors.issue.message === 'string' && (
                    <Text className="text-red-500">{errors.issue.message}</Text>
                )}
                <View className="mt-4 relative h-64">
                    <Input
                        className="p-4 relative"
                        containerClassName="h-full justify-start"
                        inputStyle={{}}
                        multiline
                        placeholder={issuePlaceholder()}
                        maxLength={1000}
                        onChangeText={(details) =>
                            setDetailsLength(details.length)
                        }
                        editable={selectedIssue ? true : false}
                    />
                </View>
                <Text className="text-gray-500 text-right">
                    {detailLength}/1000
                </Text>
            </View>
            <Button
                className="w-56 mb-2 mx-auto  mb-8"
                disabled={detailLength === 0}
                onPress={handleSubmit(onSubmit)}
            >
                Send
            </Button>
        </View>
    )
}

export default ReportIssuePage
