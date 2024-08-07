import { View, Text, Modal, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Button } from '@/components/shared/button'

interface ReminderPickerProps {
    showReminderModal: boolean
    handleReminderSelect: (event: any) => void
    confirmReminder: (event: any) => void
    reminder: string
}

export const ReminderPicker = (props: ReminderPickerProps) => {
    const {
        showReminderModal,
        reminder,
        handleReminderSelect,
        confirmReminder,
    } = props

    const reminderOptions = [
        'No Reminder',
        'At Event',
        '15 minutes',
        '30 minutes',
        '1 hour',
        '3 hours',
        '6 hours',
        '12 hours',
    ]
    return (
        <Modal
            animationType="slide"
            visible={showReminderModal}
            transparent={true}
        >
            <View className={`flex-1 justify-center items-center `}>
                <View className="bg-white rounded-2xl p-5 w-4/5">
                    <View className="w-full flex justify-center items-center py-5">
                        <Text className="text-lg font-bold mb-4 text-orange-500">
                            Add Reminder Before Event
                        </Text>
                    </View>
                    {reminderOptions.map((option, index) => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => handleReminderSelect(option)}
                        >
                            <View className="flex-row items-center m-2 ">
                                {reminder === option && (
                                    <MaterialCommunityIcons
                                        name="radiobox-marked"
                                        size={20}
                                        color="blue"
                                    />
                                )}
                                {reminder !== option && (
                                    <MaterialCommunityIcons
                                        name="radiobox-blank"
                                        size={20}
                                        color="gray"
                                    />
                                )}
                                <Text className="ml-2 text-gray-500 text-base ">
                                    {option}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <View className="w-full flex justify-center items-center pt-5">
                        <Button
                            gradientColors={['#f57b3a', '#f57b3a']}
                            buttonClassName="rounded-full "
                            textClassName="px-10"
                            onPress={() => {
                                confirmReminder(reminder)
                            }}
                        >
                            Confirm
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
