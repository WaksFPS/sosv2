import TextScalable from '@/components/shared/text-scale'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { router, useLocalSearchParams } from 'expo-router'
import { Image } from 'expo-image'
import { Button } from '@/components/shared/button'
import { useMutation } from '@tanstack/react-query'
import { deleteUserMediaApi, updateUserApi } from '@/services/endpoints/user'
import {
    DeleteUserMediaType,
    UpdateUserPhotoType,
} from '@/services/endpoints/user/schema'
import { UPD_MODE_USER_PROFILE_PHOTO } from '@/dictionary/contants'
import { queryClient } from '@/store/query-client'
import { Footer } from '@/components/shared/footer'
import { Spinner } from '@/components/shared/spinner'
import Toast from 'react-native-root-toast'
const { width, height } = Dimensions.get('window')
export const PictureComponent = () => {
    const { isPrimary, photoPath, userId, urlToSave, mediaId } =
        useLocalSearchParams<{
            isPrimary: string
            photoPath: string
            userId: string
            urlToSave: string
            mediaId: string
        }>()
    const convertedUserId = parseInt(userId!, 10)
    const updateUserPhotoMutation = useMutation({
        mutationFn: (data: UpdateUserPhotoType) => updateUserApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getMediaLibrary', convertedUserId],
            })

            Toast.show('You have successfully changed your profile picture.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
            })
            router.back()
        },
    })

    const deleteUserMutation = useMutation({
        mutationFn: (data: DeleteUserMediaType) => deleteUserMediaApi(data),
        onSuccess: () => {
            Toast.show('You have successfully deleted a photo.', {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
            })

            queryClient.invalidateQueries({
                queryKey: ['getMediaLibrary', convertedUserId],
            })
            router.back()
        },
    })
    const handleSetProfilePicture = () => {
        if (userId && photoPath) {
            updateUserPhotoMutation.mutate({
                user_id: convertedUserId,
                who_updated: convertedUserId,
                upd_mode: UPD_MODE_USER_PROFILE_PHOTO,
                profile_photos: urlToSave!,
            })
        }
    }

    const handleDeletePhoto = () => {
        Alert.alert(
            'Confirm Delete Photo',
            'Are you sure you want to delete this photo?',
            [
                {
                    text: 'No',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        deleteUserMutation.mutate({
                            media_id: parseInt(mediaId!, 10),
                            who_added: convertedUserId,
                            is_primary: false,
                        })
                    },
                },
            ],
        )
    }
    return (
        <SafeAreaView className="bg-[#FDC830] flex" edges={['top']}>
            <Spinner
                visible={
                    deleteUserMutation.isPending ||
                    updateUserPhotoMutation.isPending
                }
            />
            <View className="bg-[#F1F1F2] h-full">
                <LinearGradient
                    colors={['#FDC830', '#F57435']}
                    className="h-1/8 justify-between py-1.5"
                >
                    <View className="flex justify-center">
                        <View className="flex-row justify-center">
                            <TextScalable
                                fontSize={18}
                                fontClassname="text-white font-bold text-center pb-2 pl-8 flex-1 "
                            >
                                {isPrimary === 'true'
                                    ? 'My Profile Picture'
                                    : 'Set Profile Picture'}
                            </TextScalable>
                            <TouchableOpacity
                                className="pr-5 text-right"
                                onPress={handleDeletePhoto}
                            >
                                <MaterialCommunityIcons
                                    size={width * 0.07}
                                    name="trash-can-outline"
                                    color="white"
                                    className="right"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
                <View
                    style={{
                        padding: height * 0.01,
                    }}
                    className="items-center flex-1 justify-center"
                >
                    <Image
                        source={photoPath}
                        transition={1000}
                        className="flex-1 self-stretch bg-[#E9ECEF]"
                    />
                </View>
                <View className="p-4 flex flex-row justify-center">
                    {isPrimary !== 'true' && (
                        <Button
                            style={{
                                justifyContent: 'flex-end',
                                width: width * 0.58,
                                paddingVertical: 0,
                                alignSelf: 'center',
                            }}
                            textClassName="text-xl"
                            buttonClassName="rounded-3xl mb-10"
                            gradientColors={['#F37335', '#F37335']}
                            onPress={handleSetProfilePicture}
                            disabled={updateUserPhotoMutation.isPending}
                        >
                            Set
                        </Button>
                    )}
                </View>

                <Footer />
            </View>
        </SafeAreaView>
    )
}

export default PictureComponent
