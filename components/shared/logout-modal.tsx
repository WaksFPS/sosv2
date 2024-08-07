import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import React from 'react'

interface LogoutModalProps {
    modalVisible: boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const LogoutModal = ({ modalVisible, setModalVisible }: LogoutModalProps) => {
    return (
        <Modal
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false)
            }}
        >
            <View
                className="flex-1 justify-center items-center"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
                <View className="p-10 bg-white items-center rounded-2xl">
                    <Image
                        source={require('@/assets/images/sign_out_icon.png')}
                    />
                    <Text className="text-slate-500 font-bold text-lg mt-5">
                        Are you sure you want to log out?
                    </Text>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        className="bg-orange-500 px-3 py-2 rounded-3xl mt-3 w-56"
                    >
                        <Text className="text-white font-semibold text-center text-lg">
                            No, keep me logged in
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setModalVisible(false)}
                        className="bg-white border border-orange-500 px-3 py-2 rounded-3xl mt-3 w-56"
                    >
                        <Text className="text-orange-500 font-semibold text-center text-lg">
                            Yes, log me out
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default LogoutModal
