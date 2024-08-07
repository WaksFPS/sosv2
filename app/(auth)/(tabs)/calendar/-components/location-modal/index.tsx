import { View, Text, Modal, TextInput, Button } from 'react-native'
import { Dispatch, SetStateAction } from 'react'

interface LocationPickerProps {
    showLocationModal: boolean
    setLocation: Dispatch<SetStateAction<Location>>
    handleLocationConfirm: (event: any) => void
    location: Location
}

interface Location {
    event_place: string
    street: string
    city: string
    state: string
    zip_code: string
}

export const LocationPicker = (props: LocationPickerProps) => {
    const { showLocationModal, setLocation, handleLocationConfirm, location } =
        props

    return (
        <Modal
            animationType="slide"
            visible={showLocationModal}
            transparent={true}
        >
            <View className={`flex-1 justify-center items-center bg-black/70`}>
                <View className="bg-white rounded-2xl p-5 w-4/5">
                    <Text className="text-lg font-bold mb-4">
                        Enter Location Details
                    </Text>
                    <TextInput
                        className="font-bold text-base text-gray-700 border-b border-gray-500 w-full mb-1 my-2"
                        placeholder="Event Place"
                        value={location.event_place}
                        onChangeText={(value) =>
                            setLocation({ ...location, event_place: value })
                        }
                    />
                    <TextInput
                        className="font-bold text-base text-gray-700 border-b border-gray-500 w-full mb-1 my-2"
                        placeholder="Street"
                        value={location.street}
                        onChangeText={(value) =>
                            setLocation({ ...location, street: value })
                        }
                    />
                    <TextInput
                        className="font-bold text-base text-gray-700 border-b border-gray-500 w-full mb-1 my-2"
                        placeholder="City"
                        value={location.city}
                        onChangeText={(value) =>
                            setLocation({ ...location, city: value })
                        }
                    />
                    <TextInput
                        className="font-bold text-base text-gray-700 border-b border-gray-500 w-full mb-1 my-2"
                        placeholder="State"
                        value={location.state}
                        onChangeText={(value) =>
                            setLocation({ ...location, state: value })
                        }
                    />
                    <TextInput
                        className="font-bold text-base text-gray-700 border-b border-gray-500 w-full mb-1 my-2"
                        placeholder="Zip Code"
                        value={location.zip_code}
                        onChangeText={(value) =>
                            setLocation({ ...location, zip_code: value })
                        }
                        keyboardType="numeric"
                    />
                    <Button title="Confirm" onPress={handleLocationConfirm} />
                </View>
            </View>
        </Modal>
    )
}
