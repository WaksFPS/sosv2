import React, { useEffect } from 'react'
import {
    Modal,
    View,
    TouchableOpacity,
    Platform,
    Alert,
    TouchableWithoutFeedback,
    Linking,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import TextScalable from '@/components/shared/text-scale'
import { userDataAtom } from '@/store/user'
import { useAtomValue } from 'jotai'
import { uploadPhotoApi } from '@/services/endpoints/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UploadPhotoType } from '@/services/endpoints/user/schema'
import Toast from 'react-native-root-toast'

interface IProps {
    modalVisible: boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    setIsPending: React.Dispatch<React.SetStateAction<boolean>>
}

export const PhotoLauncherComponent: React.FC<IProps> = (props) => {
    const { modalVisible, setModalVisible, setIsPending } = props
    const userData = useAtomValue(userDataAtom)
    const queryClient = useQueryClient()

    const requestPermissions = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert(
                'Permission for Storage was denied',
                'SOS requires access to your Storage to upload photos.',
                [
                    { text: 'Cancel' },
                    {
                        text: 'Settings',
                        onPress: () => {
                            Platform.OS === 'ios'
                                ? Linking.openURL('app-settings:')
                                : Linking.openSettings()
                        },
                    },
                ],
            )
        }
    }

    const uploadPhotoMutation = useMutation({
        mutationFn: (data: UploadPhotoType) => uploadPhotoApi(data),
        onSuccess: () => {
            setIsPending(false)
            Toast.show('You have successfully uploaded a photo.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
            })
            queryClient.invalidateQueries({
                queryKey: ['getMediaLibrary', userData.user.userId],
            })
        },
        onError: () => {
            Alert.alert('Something went wrong.')
        },
        onMutate: () => {
            Toast.show('Your photo is uploading. ', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
            })
        },
    })

    useEffect(() => {
        requestPermissions()
    }, [])

    const takePhoto = async () => {
        setModalVisible(false)
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })

        if (!result.canceled) {
            handleImage(result.assets[0].uri)
        }
    }

    const chooseFromLibrary = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
        })
        if (!result.canceled) {
            handleImage(result.assets[0].uri)
            setModalVisible(false)
        }
    }

    const handleImage = async (uri: string) => {
        setIsPending(true)
        if (userData.user) {
            uploadPhotoMutation.mutate({
                userId: userData.user.userId.toString(),
                imageUri: uri,
                isPrimary: false,
            })
        }
    }
    return (
        <>
            <Modal
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View className="flex-1 justify-end items-center bg-black/50 ">
                        <View
                            className="w-full h-1/5  bg-[#F7F7F7] rounded-2xl px-9 pt-7 items-center"
                            style={{
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5,
                            }}
                        >
                            <View className="absolute rounded-3xl w-16 border-t-gray-500 top-2.5 border-t-4 " />
                            <TouchableOpacity
                                className="rounded-x p-3 my-1.5 w-full items-center flex-row "
                                onPress={takePhoto}
                            >
                                <MaterialCommunityIcons
                                    size={30}
                                    color="#525252"
                                    name="camera"
                                />
                                <TextScalable
                                    fontSize={15}
                                    fontClassname="text-[#525252] ml-6"
                                >
                                    Take a photo
                                </TextScalable>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="rounded-x p-3 my-1.5 w-full items-center flex-row "
                                onPress={chooseFromLibrary}
                            >
                                <MaterialCommunityIcons
                                    size={30}
                                    color="#525252"
                                    name="image-multiple"
                                />

                                <TextScalable
                                    fontSize={15}
                                    fontClassname="text-[#525252] ml-6"
                                >
                                    Choose from library
                                </TextScalable>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}
